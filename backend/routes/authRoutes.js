const express = require('express');
const router = express.Router();

// ===import register authController=======
const {registerController,loginUser,forgotPasswordController, updateProfileController, getUserOrders, getAllOrders, updatePhotoController, deletePhotoController, getProfilePhoto}=require('../controller/authController')
const {requireSignIn, isAdmin, isUser} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadImages');


// ===routing===
// ====Register||post====


router.post('/register',registerController)
router.post('/login',loginUser)

// --------------Forgot password--------------

router.post('/forgotPassword',forgotPasswordController)


// -----------protected  user route-------------------
router.get('/user-auth',requireSignIn,isUser,(req,res)=>{
    res.status(200).send({ok:true});
});

// -----------------protected  admin route----------------------
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ok:true});
});

// ----------------profile update----------------------
// Update profile info
router.put('/profiles',requireSignIn,isUser,updateProfileController);

// Update profile photo
router.put('/update-profile', requireSignIn,isUser,upload.single('photo'), updatePhotoController);

// Delete profile photo
router.delete('/delete-profile',requireSignIn,isUser, deletePhotoController);
router.get('/get-profile',requireSignIn,isUser, getProfilePhoto);


// ----------orders--------------------------------
router.get('/my-orders', requireSignIn,getUserOrders);

router.get('/all-orders', requireSignIn,isAdmin,getAllOrders);


module.exports = router;