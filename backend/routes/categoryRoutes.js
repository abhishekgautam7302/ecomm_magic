const express = require('express');
const router = express.Router();

// import category functions
const { createCategoryController, updateCategoryController, getCategory, singleGetCategory, getCategoriesWithSubcategories, deleteCategory } = require('../controller/categoryController');

const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');



router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

// ====update category========
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
// ====get all category========
router.get('/get-category', getCategory);
// ====get single category========
router.get('/single-category/:slug', singleGetCategory);

// ====delete category========
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategory);

router.get('/category-product',getCategoriesWithSubcategories)
module.exports = router;