"""
Quick model retrainer - matches your current Python environment
"""
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, mean_absolute_error
import joblib
import os

print("🔄 Retraining model...")
np.random.seed(42)
n = 2000

df = pd.DataFrame({
    'user_type': np.random.choice(['student','employed','tourist','other'], n, p=[0.4,0.35,0.15,0.1]),
    'city': np.random.choice(['Alger','Oran','Boumerdes','Tizi Ouzou','Annaba'], n),
    'vehicle_type': np.random.choice(['bicycle','electric bicycle','scooter'], n),
    'weather': np.random.choice(['clear','rain','cold','hot'], n),
    'day_of_week': np.random.choice(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], n),
    'holiday_status': np.random.choice(['normal_day','weekend','ramadan','public_holiday'], n),
    'maintenance_required': np.random.choice([True,False], n, p=[0.08,0.92]),
})

df['age'] = [np.random.randint(18,27) if t=='student' else np.random.randint(25,56) if t=='employed' else np.random.randint(20,61) if t=='tourist' else np.random.randint(18,66) for t in df['user_type']]
df['ride_duration_min'] = [np.random.randint(30,121) if t=='tourist' else np.random.randint(15,51) if t=='employed' else np.random.randint(10,61) for t in df['user_type']]
df['loyalty_count'] = [np.random.randint(0,41) if t in ['student','employed'] else np.random.randint(0,6) if t=='tourist' else np.random.randint(0,16) for t in df['user_type']]

rates = {'bicycle':5, 'electric bicycle':8, 'scooter':10}
df['base_price_da'] = df.apply(lambda r: r['ride_duration_min']*rates[r['vehicle_type']], axis=1)
df['final_price_da'] = df.apply(lambda r: round(r['base_price_da']*(1-min(0.4,(0.2 if r['user_type']=='student' else 0.05 if r['user_type']=='employed' else 0)+(0.15 if r['loyalty_count']>=20 else 0.1 if r['loyalty_count']>=10 else 0.05 if r['loyalty_count']>=5 else 0)))*(1.1 if r['weather']=='rain' else 1.0)*np.random.uniform(0.95,1.05),2), axis=1)

df['is_weekend'] = df['day_of_week'].isin(['Friday','Saturday']).astype(int)
df['loyalty_tier'] = pd.cut(df['loyalty_count'], bins=[-1,4,9,19,100], labels=['new','bronze','silver','gold'])
df['age_group'] = pd.cut(df['age'], bins=[15,25,35,50,70], labels=['18-25','26-35','36-50','50+'])
df['cost_per_minute'] = df['base_price_da']/df['ride_duration_min']

NUMERICAL = ['age','ride_duration_min','loyalty_count','base_price_da','cost_per_minute']
CATEGORICAL = ['user_type','city','vehicle_type','weather','day_of_week','holiday_status','loyalty_tier','age_group']
BINARY = ['maintenance_required','is_weekend']

X = df[NUMERICAL + CATEGORICAL + BINARY]
y = df['final_price_da']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), NUMERICAL),
    ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), CATEGORICAL),
    ('bin', 'passthrough', BINARY)
])

model = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', GradientBoostingRegressor(n_estimators=100, max_depth=5, random_state=42))
])

model.fit(X_train, y_train)
y_pred = model.predict(X_test)
print(f"✅ R²={r2_score(y_test, y_pred):.4f}, MAE={mean_absolute_error(y_test, y_pred):.2f} DA")

os.makedirs('model', exist_ok=True)
joblib.dump(model, 'model/greenwheels_pricing_model.pkl')
print("✅ Model saved!")