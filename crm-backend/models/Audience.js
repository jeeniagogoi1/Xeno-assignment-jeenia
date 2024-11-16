const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  criteria: { 
    type: Object, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Audience', audienceSchema);
