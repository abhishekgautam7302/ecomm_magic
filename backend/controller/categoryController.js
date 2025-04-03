const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const productModel = require('../models/productModel');
exports.createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Category name is required."
            });
        }

        // Check if category already exists
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(409).send({
                success: false,
                message: "Category already exists."
            });
        }

        // Create and save new category
        const category = await new categoryModel({
            name,
            slug: slugify(name, { lower: true, strict: true })
        }).save();

        res.status(201).send({
            success: true,
            message: "New category created successfully.",
            category,
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while creating the category.",
            error: error.message
        });
    }
};


exports.updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "category successfully updated",
            category,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while Updating Category",
            error,
        })
    }
}
// =======get all category==================
exports.getCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories Lists",
            category,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error,

        })
    }
}

exports.singleGetCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug });
        res.status(200).send({
            success: true,
            message: "Single Categories Lists",
            category,
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while getting categories",
            error,
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. पहले सभी subcategories डिलीट करें
        await productModel.deleteMany({ category: id });

        // 2. फिर category डिलीट करें
        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if(!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Category and all related subcategories deleted successfully",
            deletedCategory
        });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).send({
            success: false,
            message: "Error in category deletion process",
            error: error.message
        });
    }
}

// get all category and subcategory
exports.getCategoriesWithSubcategories = async (req, res) => {
    try {
      const categories = await categoryModel.find().populate('product');
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
