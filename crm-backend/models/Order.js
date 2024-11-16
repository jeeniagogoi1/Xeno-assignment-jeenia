const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: true,
    match: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
  },
  orderDate: {
    type: Date,
    required: true
  },
  spending: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
