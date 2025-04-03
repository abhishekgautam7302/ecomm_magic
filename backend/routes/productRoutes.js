
const express = require('express');
const router = express.Router();


// -------------import controller fuctions------------

const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, searchProductController, relatedProductController, productCategoryController } = require('../controller/productController');
const { isAdmin, requireSignIn,formidableMiddleware } = require('../middlewares/authMiddleware');
// const formidable = require('express-formidable');



// -----------router for prodcut--------------

// ----------------create Product---------------
router.post('/create-product', requireSignIn, isAdmin, formidableMiddleware, createProductController);

// ----------get all Product--------------
router.get('/get-product', getProductController);

// ----------get one Product-----------
router.get('/get-product/:slug', getSingleProductController);
// --------get photo Product------------
router.get('/product-photo/:pid', productPhotoController);
// ---------------get photo Product-------------
router.put('/update-product/:pid', requireSignIn, isAdmin, formidableMiddleware, updateProductController);
// ------------deleted Product-------------
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

router.post('/product-filters', productFiltersController);

// router.get('/product-count', productCountController);
// router.get('/product-list/:page', productListController)

// -----------search product-------------
router.get('/search/:keyword', searchProductController);

// ------------SIMILAR product---------------

router.get('/related-product/:pid/:cid', relatedProductController);
// -----------category wise---------------
router.get('/product-category/:slug', productCategoryController)
module.exports = router;


