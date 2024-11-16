const express = require('express');
const router = express.Router();
const { produceMessage } = require('../config/kafka');
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  const { customerEmail, orderDate, spending } = req.body;
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(customerEmail)) {
    return res.status(400).send('Invalid email format');
  }

  try {
    await produceMessage('orders', req.body);
    res.status(201).json({ message: 'Order creation request sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
