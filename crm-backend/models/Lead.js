const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  totalSpends: { 
    type: Number, 
    required: true 
  },
  maxVisits: { 
    type: Number, 
    required: true 
  },
  lastVisit: { 
    type: Date, 
    required: true 
  },
});

module.exports = mongoose.model('Lead', leadSchema);