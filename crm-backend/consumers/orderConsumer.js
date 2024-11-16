const Order = require('../models/Order');
const { createConsumer, consumeMessages } = require('../config/kafka');

const handleOrderMessage = async (message) => {
  const { customerEmail, orderDate, spending } = message;
  const newOrder = new Order({ customerEmail, orderDate, spending });
  try {
    await newOrder.save();
    console.log("Order placed");
  } catch (error) {
    console.log(`Error saving order: ${error.message}`);
  }
};

const orderConsumer = createConsumer('crm-order-group');
consumeMessages(orderConsumer, 'orders', handleOrderMessage);
