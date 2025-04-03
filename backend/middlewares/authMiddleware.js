const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const formidable = require('formidable');

exports.requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        if (!decode) {
            return res.status(400).send({
                success: false,
                message: "please login",
            })
        }
        req.user = decode;
        next();

    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validation the token ",
        });

    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(404).json({
                success: false,
                message: "UnAuthorized Access",
            })
        }
        next();

    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong and protected routes",
        });

    }
}

exports.isUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 0) {
            return res.status(404).json({
                success: false,
                message: "UnAuthorized Access",
            })
        }
        next();

    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "That is protected route",
        });
    }
}

// 


exports.formidableMiddleware = (req, res, next) => {
    const form = new formidable.IncomingForm({
        multiples: true,
        maxFileSize: 2 * 1024 * 1024, // 2MB file limit
        keepExtensions: true, // Preserve file extensions
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Formidable parsing error:", err);
            return res.status(400).json({ error: "Form parsing failed. Ensure file size is within the allowed limit." });
        }

        req.fields = fields || {}; // Ensure fields exist
        req.files = files || {}; // Ensure files exist
        next();
    });
};

