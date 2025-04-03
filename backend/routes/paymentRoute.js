// paymentRoute.js
const express = require('express');
const router = express.Router();

const { getKey, capturePayment, verifyPayment } = require('../controller/paymentController');
const { requireSignIn } = require('../middlewares/authMiddleware');

router.get('/getKey', requireSignIn, getKey);
router.post('/createOrder', requireSignIn, capturePayment);
router.post('/verifyPayment', requireSignIn, verifyPayment);

module.exports = router;