// Order Model (Order.js)
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'Users',
    required: true
  },
  products: [{
    product: {
      type: mongoose.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  total: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered','cancle'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);