// Use consistent import style
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const path = require('path');
const fs = require('fs').promises;
const orderModel = require('../models/orderModel')

// ============ Registration ===========
exports.registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Input validation
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User is already registered." });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const user = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            photo: req.file?.path || ""
        });

        // Save the user to the database
        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user,
        });
    } catch (error) {
        console.error("Signup failed:", error);
        res.status(500).json({ success: false, message: "Error in registration", error: error.message });
    }
};

// ============= Login ===============
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not registered." });
        }

        // Match the password
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        user.password = undefined; // Remove password from response

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure only in production
        });

        res.status(200).json({ success: true, message: "Login successful.", user, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Login failed.", error: error.message });
    }
};

// ============= Forgot Password ==============
exports.forgotPasswordController = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Validate input fields
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Match the old password
        const isPasswordMatch = await comparePassword(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Old password is incorrect." });
        }

        // Hash the new password and update
        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ success: false, message: "Error resetting password.", error: error.message });
    }
};



// ----------------- Controllers ----------------- //
// Update Profile (without photo)
exports.updateProfileController = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        // Find and update user with validation
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { name, email, phone, address },
            {
                new: true,
                runValidators: true,
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            updatedUser,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.error("Profile update error:", error);
    }
}


exports.updatePhotoController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            await fs.unlink(req.file.path); // Remove uploaded file
            return res.status(400).json({
                success: false,
                message: 'Only JPG, PNG, and WEBP formats allowed'
            });
        }

        // Update user document
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { photo: req.file.filename },
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!updatedUser) {
            await fs.unlink(req.file.path); // Cleanup orphaned file
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
            message: 'Profile photo updated successfully'
        });

    } catch (error) {
        // Cleanup uploaded file if error occurs
        if (req.file) await fs.unlink(req.file.path).catch(console.error);

        console.error('Update photo error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile photo'
        });
    }
};

exports.getProfilePhoto = async (req, res) => {
    try {
        // Get user from database
        const user = await userModel.findById(req.user._id).select('photo');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if photo exists
        if (!user.photo) {
            return res.status(404).json({
                success: false,
                message: "No profile photo exists"
            });
        }

        // Construct file path
        const filePath = path.join(__dirname, '../uploads', user.photo);

        // Check if file exists
        await fs.access(filePath);

        // Send the image file
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                if (!res.headersSent) {
                    res.status(500).json({
                        success: false,
                        message: "Error retrieving photo"
                    });
                }
            }
        });

    } catch (error) {
        console.error('Get profile photo error:', error);

        if (error.code === 'ENOENT') {
            return res.status(404).json({
                success: false,
                message: "Photo file not found"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.deletePhotoController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.photo) {
            return res.status(400).json({
                success: false,
                message: 'No profile photo exists'
            });
        }

        // Delete file
        const filePath = path.join(__dirname, '../uploads', user.photo);
        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
        } catch (fileError) {
            if (fileError.code !== 'ENOENT') throw fileError;
        }

        // Update user document
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { $unset: { photo: "" } },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: false,
            user: updatedUser,
            message: 'Profile photo removed successfully'
        });

    } catch (error) {
        console.error('Delete photo error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error removing profile photo'
        });
    }
};

// order user handle
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('products.product'); // Populate product details if needed

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
};

// get all order admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1 }).populate('user', 'name email').populate('products.product');

        res.status(200).json({
            success: true,
            message: "Success fully get order data",
            orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    try {

        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

