const { createConsumer, consumeMessages } = require('../config/kafka');
const CommunicationLog = require('../models/CommunicationLog');

const handleCampaignMessage = async (message) => {
  const { customerEmail, status } = message;

  try {
    const log = await CommunicationLog.findOne({ customerEmail });
    if (log) {
      log.status = status;
      await log.save();
      console.log(`Updated status for ${customerEmail} to ${status}`);
    }
  } catch (error) {
    console.error(`Error updating status for ${customerEmail}: ${error.message}`);
  }
};

const campaignConsumer = createConsumer('crm-campaign-group');
consumeMessages(campaignConsumer, 'campaigns', handleCampaignMessage);
