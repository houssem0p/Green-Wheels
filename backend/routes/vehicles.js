const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const requireAuth = require('../middleware/requireAuth');

router.get('/', vehicleController.getAllVehicles);
router.post('/recommendation', requireAuth, vehicleController.getRecommendation);

module.exports = router;