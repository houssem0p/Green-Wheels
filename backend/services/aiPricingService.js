// backend/services/aiPricingService.js
const axios = require('axios');

const AI_PRICING_URL = process.env.AI_PRICING_URL || 'http://localhost:5001';

async function getAIPrice(rideData) {
    try {
        const response = await axios.post(`${AI_PRICING_URL}/predict`, {
            user_type: rideData.userType,
            age: rideData.age,
            city: rideData.city,
            ride_duration_min: rideData.duration,
            vehicle_type: rideData.vehicleType,
            loyalty_count: rideData.loyaltyCount,
            weather: rideData.weather,
            day_of_week: rideData.dayOfWeek,
            holiday_status: rideData.holidayStatus,
            maintenance_required: rideData.maintenanceRequired || false,
            base_price_da: rideData.basePrice
        }, {
            headers: {
                'Content-Type': 'application/json'  // ✅ ADD THIS
            },
            timeout: 5000
        });
        
        return response.data;
    } catch (error) {
        console.error('AI Pricing API error:', error.message);
        return fallbackPricing(rideData);
    }
}

/**
 * Fallback pricing when AI service is unavailable
 */
function fallbackPricing(rideData) {
    const { basePrice, userType, loyaltyCount } = rideData;
    
    let discount = 0;
    
    // Profile discount
    if (userType === 'student') discount += 0.20;
    else if (userType === 'employed') discount += 0.05;
    
    // Loyalty discount
    if (loyaltyCount >= 20) discount += 0.15;
    else if (loyaltyCount >= 10) discount += 0.10;
    else if (loyaltyCount >= 5) discount += 0.05;
    
    const finalPrice = basePrice * (1 - Math.min(0.40, discount));
    
    return {
        success: true,
        base_price: basePrice,
        predicted_price: Math.round(finalPrice),
        savings: basePrice - Math.round(finalPrice),
        savings_percent: Math.round(discount * 100),
        fallback: true,
        breakdown: {
            user_type: userType,
            loyalty_tier: loyaltyCount >= 20 ? 'gold' : loyaltyCount >= 10 ? 'silver' : loyaltyCount >= 5 ? 'bronze' : 'new'
        }
    };
}

/**
 * Check if AI service is healthy
 */
async function checkAIHealth() {
    try {
        const response = await axios.get(`${AI_PRICING_URL}/health`, { timeout: 2000 });
        return response.data.model_loaded === true;
    } catch {
        return false;
    }
}

module.exports = {
    getAIPrice,
    checkAIHealth,
    fallbackPricing
};