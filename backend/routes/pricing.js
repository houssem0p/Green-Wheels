// backend/routes/pricing.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getAIPrice, checkAIHealth } = require('../services/aiPricingService');
const db = require('../config/db');

const CITY_COORDINATES = {
  boumerdes: { latitude: 36.7674, longitude: 3.4776 },
  alger: { latitude: 36.7372, longitude: 3.0863 },
  algiers: { latitude: 36.7372, longitude: 3.0863 },
  oran: { latitude: 35.6971, longitude: -0.6359 },
  constantine: { latitude: 36.365, longitude: 6.6147 },
  annaba: { latitude: 36.9, longitude: 7.7667 }
};

const normalizeCity = (city) => {
  if (!city) return 'alger';
  return city.toString().trim().toLowerCase();
};

const mapWeatherCodeToCategory = (code) => {
  if (code === 0) return 'clear';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'clear';
};

const getWeatherForDate = async (city, date) => {
  const normalizedCity = normalizeCity(city);
  const location = CITY_COORDINATES[normalizedCity] || CITY_COORDINATES.alger;
  const dateStr = date.toISOString().split('T')[0];

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weathercode&timezone=auto&start_date=${dateStr}&end_date=${dateStr}`;
    const response = await axios.get(url, { timeout: 5000 });
    const weatherCode = response.data?.daily?.weathercode?.[0];
    return mapWeatherCodeToCategory(weatherCode);
  } catch (error) {
    console.error('Weather fetch failed:', error.message);
    return 'clear';
  }
};

// GET /api/pricing/calculate
router.post('/calculate', async (req, res) => {
    try {
        const { userId, vehicleId, duration, scheduledDate } = req.body;
        
        // 1. Get user profile
        const [profiles] = await db.query(
            `SELECT user_type, TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age, city 
             FROM profiles WHERE user_id = ?`,
            [userId]
        );
        const profile = profiles[0];
        
        // 2. Get loyalty count
        const [loyalty] = await db.query(
            `SELECT COUNT(*) AS count FROM rides 
             WHERE user_id = ? AND status = 'completed' 
             AND started_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)`,
            [userId]
        );
        const loyaltyCount = loyalty[0].count;
        
        // 3. Get vehicle details
        const [vehicles] = await db.query(
            `SELECT type, 
             CASE 
               WHEN type = 'bicycle' THEN 5
               WHEN type = 'electric bicycle' THEN 8
               WHEN type = 'scooter' THEN 10
             END AS price_per_minute
             FROM vehicles WHERE id = ?`,
            [vehicleId]
        );
        const vehicle = vehicles[0];
        
        // 4. Calculate base price
        const basePrice = duration * vehicle.price_per_minute;
        
        // 5. Get current context
        const now = scheduledDate ? new Date(scheduledDate) : new Date();
        const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
        const isWeekend = ['Friday', 'Saturday'].includes(dayOfWeek);
        const holidayStatus = isWeekend ? 'weekend' : 'normal_day';
        const weather = await getWeatherForDate(profile.city, now);

        // 8. Call AI pricing service
        const aiResult = await getAIPrice({
            userType: profile.user_type,
            age: profile.age,
            city: profile.city,
            duration: duration,
            vehicleType: vehicle.type,
            loyaltyCount: loyaltyCount,
            weather: weather,
            dayOfWeek: dayOfWeek,
            holidayStatus: holidayStatus,
            maintenanceRequired: false,
            basePrice: basePrice
        });
        
        res.json(aiResult);
        
    } catch (error) {
        console.error('Pricing calculation error:', error);
        res.status(500).json({ error: 'Failed to calculate price' });
    }
});

// GET /api/pricing/health
router.get('/health', async (req, res) => {
    const aiHealthy = await checkAIHealth();
    res.json({
        service: 'pricing',
        status: 'healthy',
        ai_service: aiHealthy ? 'connected' : 'fallback_mode'
    });
});

module.exports = router;