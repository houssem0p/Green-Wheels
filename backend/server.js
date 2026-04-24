const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const helmet = require('helmet');

const db = require('./config/db');
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const errorHandler = require('./middleware/errorHandler');
const { verifyMailTransport } = require('./config/mail');

// ─── Route imports ────────────────────────────────────────────────────────────
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const vehicleRoutes = require('./routes/vehicles');

const app = express();


const pricingRoutes = require('./routes/pricing');

app.use('/api/pricing', pricingRoutes);


// 1. SECURITY HEADERS
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// 2. CORS CONFIGURATION (Must be before routes)
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
const allowedOrigins = [clientUrl, 'http://localhost:5174', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy violation: origin ${origin} not allowed.`));
  },
  credentials: true, // Required for gw_session cookies
}));

// 3. BODY PARSING (Must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. SESSION STORAGE (Must be before routes)
const DB_PORT = Number(process.env.DB_PORT) || 3308;
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || '127.0.0.1',
  port: DB_PORT,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'greenwheels',
});

app.use(session({
  name: 'gw_session',
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
}));

// 5. ROUTES (Must be after Session & CORS)
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));



app.get('/api/test-mail', async (req, res) => {
  const { getMailTransporter } = require('./config/mail');
  const t = getMailTransporter();
  if (!t) return res.json({ error: 'No transporter — check EMAIL_USER/EMAIL_PASS in .env' });
  try {
    await t.verify();
    res.json({ ok: true, message: 'SMTP connection works!' });
  } catch (err) {
    res.json({ error: err.message, code: err.code });
  }
});
// 6. GLOBAL ERROR HANDLER (Always last)
app.use(errorHandler);

// ─── Server Boot Logic ────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Test DB connection
    const conn = await db.getConnection();
    conn.release();
    console.log(`✅ MySQL connected (port ${DB_PORT} · ${process.env.DB_NAME || 'greenwheels'})`);

    // Auto-create tables (Migration)
    await User.migrate();
    await Vehicle.migrate();
    console.log('✅ Tables ready');

    // Email verification
    if (process.env.EMAIL_SKIP_VERIFY !== 'true') {
      try {
        const v = await verifyMailTransport();
        if (v.skip) {
          console.log('ℹ️ E-mail: SMTP non configuré.');
        } else {
          console.log('✅ E-mail: connexion SMTP OK.');
        }
      } catch (smtpErr) {
        console.error('❌ E-mail: échec SMTP —', smtpErr.message);
      }
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();