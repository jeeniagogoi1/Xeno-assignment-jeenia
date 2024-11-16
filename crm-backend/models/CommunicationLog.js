const mongoose = require('mongoose');

const CommunicationLogSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: true,
    match: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['SENT', 'FAILED'],
    default: 'SENT',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CommunicationLog', CommunicationLogSchema);
