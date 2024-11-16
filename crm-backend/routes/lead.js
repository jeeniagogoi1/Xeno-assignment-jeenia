const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { produceMessage } = require('../config/kafka');

router.get('/', async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

router.post('/', async (req, res) => {
  const { name, email, totalSpends, maxVisits, lastVisit } = req.body;
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }

  try {
    await produceMessage('leads', req.body);
    res.status(201).json({ message: 'Lead creation request sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const lead = await Lead.findOne({"email": req.params.email});
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:email', async (req, res) => {
  const { name, email, totalSpends, maxVisits, lastVisit } = req.body;
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  if (email && !emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }

  try {
    const lead = await Lead.findOneAndUpdate(
      { email: req.params.email },
      { name, email, totalSpends, maxVisits, lastVisit },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:email', async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ email: req.params.email });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
