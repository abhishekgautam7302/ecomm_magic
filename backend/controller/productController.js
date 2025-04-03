const productModel = require('../models/productModel');
const fs = require('fs');
const slugify = require('slugify');
const categoryModel = require('../models/categoryModel');

// Create Product Controller

exports.createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files || {}; // Prevent undefined errors

        // Input validation
        if (!name) return res.status(400).json({ error: 'Name is required' });
        if (!description) return res.status(400).json({ error: 'Description is required' });
        if (!price) return res.status(400).json({ error: 'Price is required' });
        if (!category) return res.status(400).json({ error: 'Category is required' });
        if (!quantity) return res.status(400).json({ error: 'Quantity is required' });

        const product = new productModel({
            ...req.fields,
            slug: slugify(name),
        });

        // Handle photo (Ensure filepath is available)
        if (photo && photo.filepath) {
            const photoData = fs.readFileSync(photo.filepath);
            product.photo.data = photoData;
            product.photo.contentType = photo.mimetype; // Use correct mimetype
        }

        // Save product 
        await product.save();
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the product.',
            error: error.message,
        });
    }
};


// Get All Products Controller
exports.getProductController = async (req, res) => {
    try {
        const products = await productModel.find({})
            .populate('category')
            .select('-photo')
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalCount: products.length,
            message: 'All products retrieved successfully',
            products,
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving products.',
            error: error.message,
        });
    }
};

// Get Single Product Controller
exports.getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({slug})
            .select('-photo')
            .populate('category');

        if (!product) {
            return res.status(401).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            product,
        });
    } catch (error) {
        console.error('Error getting single product:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the product.',
            error: error.message,
        });
    }
};

// Get Product Photo Controller
exports.productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');

        if (product && product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }

        res.status(404).json({
            success: false,
            message: 'No photo found for this product',
        });
    } catch (error) {
        console.error('Error getting product photo:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the product photo.',
            error: error.message,
        });
    }
};

// Delete Product Controller
exports.deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the product.',
            error: error.message,
        });
    }
};

// Update Product Controller

exports.updateProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Check if product exists
        const product = await productModel.findById(pid);
        if (!product) return res.status(404).json({ error: "Product not found" });

        // Validate required fields
        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!description) return res.status(400).json({ error: "Description is required" });
        if (!price) return res.status(400).json({ error: "Price is required" });
        if (!category) return res.status(400).json({ error: "Category is required" });
        if (!quantity) return res.status(400).json({ error: "Quantity is required" });

        // Validate photo size
        if (photo && photo.size >= 2 * 1024 * 1024) {
            return res.status(400).json({ error: "Photo size should be less than 2MB" });
        }

        // Update product details (excluding photo)
        const updatedFields = {
            name,
            description,
            price,
            category,
            quantity,
            shipping,
            slug: slugify(name, { lower: true }),
        };

        const updatedProduct = await productModel.findByIdAndUpdate(pid, updatedFields, { new: true });

        // If photo exists, update it separately
        if (photo && photo.filepath) {
            updatedProduct.photo.data = fs.readFileSync(photo.filepath);
            updatedProduct.photo.contentType = photo.mimetype;
            await updatedProduct.save();
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product.",
            error: error.message,
        });
    }
};



// ======filters======
exports.productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let arg = {}
        if (checked.length > 0) arg.category = checked;
        if (radio.length) arg.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(arg);
        res.status(200).json({
            success: true,
            products,
        })

    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error while Fillterring Products",
        })
    }
}

// ======serch product controller======
exports.searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select('-photo');
        res.status(200).json(result);


    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error while serching Products",
        })
    }
}




// -------SIMILAR PRODUCT-------------
exports.relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;

        // Validate required parameters
        if (!pid || !cid) {
            return res.status(400).json({
                success: false,
                message: "Product ID and Category ID are required",
            });
        }

        // Fetch related products
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid }, // Exclude the current product
            })
            .select('-photo') // Exclude the photo field
            .populate('category'); // Populate category details

        // Send response
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error in relatedProductController:", error);
        res.status(500).json({
            success: false,
            message: "Error while fetching similar products",
        });
    }
};


// get product by category
exports.productCategoryController = async (req, res) => {
    try {
        // Fetch the category based on the slug
        const category = await categoryModel.findOne({ slug: req.params.slug });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Fetch products associated with the category and populate the category field
        const products = await productModel
            .find({ category: category._id })
            .populate('category');

        // Send response with products and category data
        res.status(200).json({
            success: true,
            products,
            category,
        });

    } catch (error) {
        console.error("Error in productCategoryController:", error);
        res.status(500).json({
            success: false,
            message: "Error while fetching category products",
        });
    }
};





