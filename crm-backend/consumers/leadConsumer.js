const Lead = require('../models/Lead');
const { createConsumer, consumeMessages } = require('../config/kafka');

const handleLeadMessage = async (message) => {
  const { name, email, totalSpends, maxVisits, lastVisit } = message;
  const newLead = new Lead({ name, email, totalSpends, maxVisits, lastVisit });

  try {
    await newLead.save();
    console.log(`Lead saved: ${email}`);
  } catch (error) {
    console.error(`Error saving lead: ${error.message}`);
  }
};

const leadConsumer = createConsumer('crm-lead-group');
consumeMessages(leadConsumer, 'leads', handleLeadMessage);
