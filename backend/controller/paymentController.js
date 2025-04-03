// paymentController.js
const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const crypto = require('crypto');
// const { config } = require('dotenv');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

exports.capturePayment = async (req, res) => {
  try {
    const amount = req.body.amount * 100; // Convert to paise
    const currency = 'INR';

    const options = {
      amount: amount.toString(),
      currency,
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Payment capture failed' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Create new order in database
    const newOrder = new Order({
      user: req.user._id,
      products: req.body.products,
      total: req.body.total,
      address: req.body.address,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order: newOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};