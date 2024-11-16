const express = require('express');
const router = express.Router();
const { createCampaign, deliveryReceipt } = require('../controllers/campaignController');

router.post('/', createCampaign);
router.post('/delivery-receipt', deliveryReceipt);

module.exports = router;