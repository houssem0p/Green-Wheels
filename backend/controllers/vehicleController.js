const axios = require('axios');
const db = require('../config/db');
const Vehicle = require('../models/Vehicle');

// Base rates per hour
const HOURLY_RATES = {
  'bicycle': 100,
  'electric bicycle': 150,
  'scooter': 200
};

// City coordinates for weather API
const CITY_COORDINATES = {
  boumerdes: { latitude: 36.7674, longitude: 3.4776 },
  alger: { latitude: 36.7372, longitude: 3.0863 },
  algiers: { latitude: 36.7372, longitude: 3.0863 },
  oran: { latitude: 35.6971, longitude: -0.6359 },
  constantine: { latitude: 36.365, longitude: 6.6147 },
  annaba: { latitude: 36.9, longitude: 7.7667 },
  'tizi ouzou': { latitude: 36.7118, longitude: 4.0499 }
};

// Algerian Public Holidays 2026
const PUBLIC_HOLIDAYS = [
  { month: 1, day: 1, name: "New Year's Day" },
  { month: 1, day: 12, name: "Yennayer (Amazigh New Year)" },
  { month: 5, day: 1, name: "Labour Day" },
  { month: 7, day: 5, name: "Independence Day" },
  { month: 11, day: 1, name: "Revolution Day" },
];

// Ramadan 2026 (approximate - March 1 to March 30, 2026)
const RAMADAN_2026 = {
  start: new Date('2026-03-01'),
  end: new Date('2026-03-30')
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

// ======================================================
// WEATHER API (Open-Meteo - Free, no API key needed)
// ======================================================
const getWeatherForDate = async (city, date) => {
  const normalizedCity = normalizeCity(city);
  const location = CITY_COORDINATES[normalizedCity] || CITY_COORDINATES.alger;
  const dateStr = date.toISOString().split('T')[0];

  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weathercode&timezone=auto&start_date=${dateStr}&end_date=${dateStr}`;
    const response = await axios.get(weatherUrl, { timeout: 5000 });
    const weatherCode = response.data?.daily?.weathercode?.[0];
    console.log(`🌤️ Weather for ${city} on ${dateStr}: code ${weatherCode} → ${mapWeatherCodeToCategory(weatherCode)}`);
    return mapWeatherCodeToCategory(weatherCode);
  } catch (error) {
    console.error('Weather fetch failed:', error.message);
    // Fallback: Seasonal weather for Algeria
    const month = date.getMonth() + 1;
    if (month >= 11 || month <= 2) return 'cold';
    if (month >= 6 && month <= 8) return 'hot';
    return 'clear';
  }
};

// ======================================================
// HOLIDAY DETECTION
// ======================================================
const getHolidayStatus = (date) => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  
  // Check weekend (Friday & Saturday in Algeria)
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    return 'weekend';
  }
  
  // Check Ramadan
  if (date >= RAMADAN_2026.start && date <= RAMADAN_2026.end) {
    return 'ramadan';
  }
  
  // Check public holidays
  for (const holiday of PUBLIC_HOLIDAYS) {
    if (month === holiday.month && dayOfMonth === holiday.day) {
      console.log(`🎉 Public holiday detected: ${holiday.name}`);
      return 'public_holiday';
    }
  }
  
  return 'normal_day';
};

// ======================================================
// DAY OF WEEK
// ======================================================
const getDayOfWeek = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// ======================================================
// LOYALTY TIER HELPER
// ======================================================
const getLoyaltyTier = (count) => {
  if (count >= 20) return 'gold';
  if (count >= 10) return 'silver';
  if (count >= 5) return 'bronze';
  return 'new';
};

// ======================================================
// GET ALL VEHICLES
// ======================================================
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAllAvailable();
    res.json({ success: true, vehicles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
// GET AI RECOMMENDATION
// ======================================================
exports.getRecommendation = async (req, res) => {
  try {
    const { vehicleId, durationType, durationValue, startDate, endDate } = req.body;
    const userId = req.session.userId;

    // ======================================================
    // 1. Get vehicle details FROM DATABASE
    // ======================================================
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    // ✅ Vehicle object contains: id, code, type, base_price, status, etc.
    console.log(`🚲 Vehicle fetched: ${vehicle.type} - ${vehicle.base_price} DA/hour`);

    // ======================================================
    // 2. Get user profile from profiles table
    // ======================================================
    const [profileRows] = await db.execute(
      `SELECT 
        p.user_type,
        p.completion_pct,
        p.is_eligible_for_ai_pricing,
        TIMESTAMPDIFF(YEAR, p.date_of_birth, CURDATE()) AS age,
        p.city,
        p.verification_status
       FROM profiles p
       WHERE p.user_id = ?`,
      [userId]
    );

    if (profileRows.length === 0) {
      return res.json({
        success: true,
        aiEligible: false,
        profileCompletion: 0,
        message: 'Please complete your profile to get pricing recommendations.',
        redirectToProfile: true
      });
    }

    const profile = profileRows[0];
    const isEligibleForAI = profile.is_eligible_for_ai_pricing === 1;
    const profileCompletion = profile.completion_pct || 0;

    // ======================================================
    // 3. Get REAL loyalty count from rides table
    // ======================================================
    const [loyaltyRows] = await db.execute(
      `SELECT COUNT(*) AS count 
       FROM rides 
       WHERE user_id = ? 
         AND status = 'completed' 
         AND started_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)`,
      [userId]
    );
    
    const loyaltyCount = loyaltyRows[0]?.count || 0;

    // ======================================================
    // 4. Calculate duration and base price
    // ======================================================
    let totalHours = 0;
    if (durationType === 'hours') {
      totalHours = parseInt(durationValue.replace('h', ''));
    } else if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      totalHours = Math.ceil(diffTime / (1000 * 60 * 60));
    } else {
      totalHours = 1;
    }

    // ✅ USE PRICE FROM DATABASE
    const hourlyRate = vehicle.base_price || 100;
    const basePriceTotal = hourlyRate * totalHours;
    const durationMinutes = totalHours * 60;

    // ======================================================
    // 5. Get weather and holiday data
    // ======================================================
    const selectedDate = startDate ? new Date(startDate) : new Date();
    const city = profile.city || 'Alger';
    
    const weather = await getWeatherForDate(city, selectedDate);
    const dayOfWeek = getDayOfWeek(selectedDate);
    const holidayStatus = getHolidayStatus(selectedDate);
    
    console.log(`📍 ${city} | 📅 ${dayOfWeek} | 🌤️ ${weather} | 🎉 ${holidayStatus}`);
    console.log(`💰 ${vehicle.type}: ${hourlyRate} DA/h × ${totalHours}h = ${basePriceTotal} DA`);

    // ======================================================
    // 6. Prepare AI payload
    // ======================================================
    const aiPayload = {
      user_type: profile.user_type || 'other',
      age: profile.age || 25,
      city: city,
      ride_duration_min: durationMinutes,
      vehicle_type: vehicle.type,
      loyalty_count: loyaltyCount,
      weather: weather,
      day_of_week: dayOfWeek,
      holiday_status: holidayStatus,
      maintenance_required: false,
      base_price_da: basePriceTotal
    };

    console.log('📤 AI Payload:', JSON.stringify(aiPayload, null, 2));

    // ... rest of the function (AI call and fallback) remains the same ...

    // 7. Call AI service if eligible
    if (isEligibleForAI) {
      try {
        const aiResponse = await fetch('http://localhost:5001/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(aiPayload)
        });

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();

          return res.json({
            success: true,
            aiEligible: true,
            profileCompletion,
            recommendation: {
              vehicle: {
                id: vehicle.id,
                code: vehicle.code,
                type: vehicle.type,
                hourlyRate: hourlyRate
              },
              duration: {
                hours: totalHours,
                minutes: durationMinutes
              },
              pricing: {
                basePrice: basePriceTotal,
                aiPrice: aiResult.predicted_price,
                savings: aiResult.savings,
                savingsPercent: aiResult.savings_percent
              },
              breakdown: {
                userType: profile.user_type,
                loyaltyCount: loyaltyCount,
                loyaltyTier: aiResult.breakdown?.loyalty_tier || getLoyaltyTier(loyaltyCount),
                weather: weather,
                dayOfWeek: dayOfWeek,
                holidayStatus: holidayStatus,
                isWeekend: holidayStatus === 'weekend'
              }
            }
          });
        }
      } catch (aiError) {
        console.error('❌ AI service error:', aiError.message);
      }
    }

    // 8. Fallback pricing
    let discount = 0;
    if (profile.user_type === 'student') discount += 0.20;
    else if (profile.user_type === 'employed') discount += 0.05;
    
    if (loyaltyCount >= 20) discount += 0.15;
    else if (loyaltyCount >= 10) discount += 0.10;
    else if (loyaltyCount >= 5) discount += 0.05;
    
    const finalPrice = Math.round(basePriceTotal * (1 - Math.min(0.40, discount)));

    return res.json({
      success: true,
      aiEligible: false,
      profileCompletion,
      message: isEligibleForAI 
        ? 'AI service temporarily unavailable, using standard pricing.' 
        : `Complete your profile (${profileCompletion}% / 75%) to unlock AI personalized pricing!`,
      recommendation: {
        vehicle: {
          id: vehicle.id,
          code: vehicle.code,
          type: vehicle.type,
          hourlyRate: hourlyRate
        },
        duration: {
          hours: totalHours,
          minutes: durationMinutes
        },
        pricing: {
          basePrice: basePriceTotal,
          finalPrice: finalPrice,
          savings: basePriceTotal - finalPrice,
          savingsPercent: Math.round(discount * 100)
        },
        breakdown: {
          userType: profile.user_type,
          loyaltyCount: loyaltyCount,
          loyaltyTier: getLoyaltyTier(loyaltyCount),
          weather: weather,
          dayOfWeek: dayOfWeek,
          holidayStatus: holidayStatus,
          profileDiscount: profile.user_type === 'student' ? 20 : (profile.user_type === 'employed' ? 5 : 0),
          loyaltyDiscount: loyaltyCount >= 20 ? 15 : (loyaltyCount >= 10 ? 10 : (loyaltyCount >= 5 ? 5 : 0))
        }
      }
    });

  } catch (err) {
    console.error('❌ Recommendation error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};