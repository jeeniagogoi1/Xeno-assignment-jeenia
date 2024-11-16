const CommunicationLog = require('../models/CommunicationLog');
const Lead = require('../models/Lead');
const { produceMessage } = require('../config/kafka');

const createCampaign = async (req, res) => {
  const { audienceCriteria, message } = req.body;
  try {
    const audience = await Lead.find(audienceCriteria);
    const logs = audience.map(lead => ({
      customerEmail: lead.email,
      message,
    }));
    await CommunicationLog.insertMany(logs);
    res.json(logs);

    logs.forEach(async log => {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      await produceMessage('campaigns', { customerEmail: log.customerEmail, status });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deliveryReceipt = async (req, res) => {
  const { email, status } = req.body;
  try {
    const log = await CommunicationLog.findOne({ customerEmail: email });
    if (log) {
      log.status = status;
      await log.save();
    }
    res.send('Delivery status updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createCampaign,
  deliveryReceipt
};
