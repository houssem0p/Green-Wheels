const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const requireAuth = require('../middleware/requireAuth');

router.post('/create', requireAuth, paymentController.createPayment);
router.get('/my-payments', requireAuth, paymentController.getUserPayments);

module.exports = router;