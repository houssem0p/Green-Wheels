"""
GreenWheels AI Pricing Microservice
Flask API for personalized price predictions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import logging
import os

# ======================================================
# SETUP
# ======================================================

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'greenwheels_pricing_model.pkl')

try:
    model = joblib.load(MODEL_PATH)
    logger.info("✅ Model loaded successfully")
except Exception as e:
    logger.error(f"❌ Failed to load model: {e}")
    model = None

# ======================================================
# FEATURE ENGINEERING (must match training)
# ======================================================

# Feature columns (must match training order)
NUMERICAL_FEATURES = ['age', 'ride_duration_min', 'loyalty_count', 'base_price_da', 'cost_per_minute']
CATEGORICAL_FEATURES = ['user_type', 'city', 'vehicle_type', 'weather', 'day_of_week', 
                        'holiday_status', 'loyalty_tier', 'age_group']
BINARY_FEATURES = ['maintenance_required', 'is_weekend']

FEATURE_COLUMNS = NUMERICAL_FEATURES + CATEGORICAL_FEATURES + BINARY_FEATURES

def engineer_features(data):
    """Add engineered features to input data"""
    df = pd.DataFrame([data])
    
    # is_weekend
    df['is_weekend'] = df['day_of_week'].isin(['Friday', 'Saturday']).astype(int)
    
    # loyalty_tier
    loyalty = data.get('loyalty_count', 0)
    if loyalty >= 20:
        df['loyalty_tier'] = 'gold'
    elif loyalty >= 10:
        df['loyalty_tier'] = 'silver'
    elif loyalty >= 5:
        df['loyalty_tier'] = 'bronze'
    else:
        df['loyalty_tier'] = 'new'
    
    # age_group
    age = data.get('age', 25)
    if age <= 25:
        df['age_group'] = '18-25'
    elif age <= 35:
        df['age_group'] = '26-35'
    elif age <= 50:
        df['age_group'] = '36-50'
    else:
        df['age_group'] = '50+'
    
    # cost_per_minute
    base_price = data.get('base_price_da', 0)
    duration = data.get('ride_duration_min', 1)
    df['cost_per_minute'] = base_price / duration if duration > 0 else 0
    
    return df

# ======================================================
# ROUTES
# ======================================================

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict personalized price for a ride
    
    Expected JSON payload:
    {
        "user_type": "student",
        "age": 21,
        "city": "Boumerdes",
        "ride_duration_min": 30,
        "vehicle_type": "electric bicycle",
        "loyalty_count": 15,
        "weather": "clear",
        "day_of_week": "Monday",
        "holiday_status": "normal_day",
        "maintenance_required": false,
        "base_price_da": 240
    }
    """
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 503
    
    try:
        data = request.get_json()
        logger.info(f"Received prediction request: {data}")
        
        # Engineer features
        input_df = engineer_features(data)
        
        # Ensure all columns exist and in correct order
        for col in FEATURE_COLUMNS:
            if col not in input_df.columns:
                input_df[col] = 0
        
        input_df = input_df[FEATURE_COLUMNS]
        
        # Make prediction
        predicted_price = float(model.predict(input_df)[0])
        predicted_price = round(predicted_price, 2)
        
        base_price = data.get('base_price_da', 0)
        savings = base_price - predicted_price
        savings_percent = (savings / base_price * 100) if base_price > 0 else 0
        
        # Build response
        response = {
            'success': True,
            'base_price': base_price,
            'predicted_price': predicted_price,
            'savings': round(savings, 2),
            'savings_percent': round(savings_percent, 1),
            'breakdown': {
                'user_type': data.get('user_type'),
                'loyalty_tier': input_df['loyalty_tier'].iloc[0],
                'weather': data.get('weather'),
                'is_weekend': bool(input_df['is_weekend'].iloc[0]),
                'maintenance_discount': data.get('maintenance_required', False)
            }
        }
        
        logger.info(f"Prediction: {predicted_price} DA (savings: {savings:.2f} DA)")
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict-batch', methods=['POST'])
def predict_batch():
    """Predict prices for multiple rides at once"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 503
    
    try:
        data = request.get_json()
        rides = data.get('rides', [])
        
        results = []
        for ride in rides:
            input_df = engineer_features(ride)
            for col in FEATURE_COLUMNS:
                if col not in input_df.columns:
                    input_df[col] = 0
            input_df = input_df[FEATURE_COLUMNS]
            
            predicted_price = float(model.predict(input_df)[0])
            results.append({
                'base_price': ride.get('base_price_da', 0),
                'predicted_price': round(predicted_price, 2)
            })
        
        return jsonify({'success': True, 'predictions': results})
        
    except Exception as e:
        logger.error(f"Batch prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# ======================================================
# MAIN
# ======================================================

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    logger.info(f"🚀 Starting GreenWheels AI Pricing API on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)