const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const helmet = require('helmet');

const db = require('./config/db');
const User = require('./models/User');
const errorHandler = require('./middleware/errorHandler');
const { verifyMailTransport } = require('./config/mail');

// ─── Route imports ────────────────────────────────────────────────────────────
const authRoutes = require('./routes/auth');
// const userRoutes    = require('./routes/users');
// const rideRoutes    = require('./routes/rides');
// const stationRoutes = require('./routes/stations');
// const vehicleRoutes = require('./routes/vehicles');
// const adminRoutes   = require('./routes/admin');

const app = express();

// ─── Security & parsing ───────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,           // Required for session cookies cross-origin
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Session store (MySQL) ────────────────────────────────────────────────────
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
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
// app.use('/api/users',    userRoutes);
// app.use('/api/rides',    rideRoutes);
// app.use('/api/stations', stationRoutes);
// app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/admin',    adminRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ─── Global error handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Boot ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Test DB connection
    const conn = await db.getConnection();
    conn.release();
    console.log(`✅  MySQL connected (port ${DB_PORT} · ${process.env.DB_NAME || 'greenwheels'})`);

    // Auto-create tables
    await User.migrate();
    console.log('✅  Tables ready');

    if (process.env.EMAIL_SKIP_VERIFY !== 'true') {
      try {
        const v = await verifyMailTransport();
        if (v.skip) {
          console.log('ℹ️  E-mail : SMTP non configuré (pas de EMAIL_USER/EMAIL_PASS).');
        } else {
          console.log('✅  E-mail : connexion SMTP OK (Gmail / autre). Les reset par mail peuvent partir.');
        }
      } catch (smtpErr) {
        console.error('❌  E-mail : échec de la connexion SMTP —', smtpErr.message);
        console.error('    Vérifiez Gmail : mot de passe d’application (16 caractères), 2FA activée, pas de mot de passe Gmail normal.');
      }
    }

    app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌  Failed to start server:', err.message);
    process.exit(1);
  }
<<<<<<< HEAD
  console.log('Connected to MySQL database');
});


// Middleware
app.use(cors());
app.use(express.json());

// routes
const stationRoutes = require('./routes/stationRoutes');

app.use('/api/stations', stationRoutes);








// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!', status: 'OK' });
});

// Start server with explicit success/error handling.
const server = app.listen(PORT);

server.on('listening', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}/api/health`);
  console.log(`Test: http://localhost:${PORT}/api/stations`);
});

server.on('error', (err) => {
  console.error(`Failed to start server on port ${PORT}:`, err.message);
  process.exit(1);
});
=======
})();
>>>>>>> f004a2e2efb70e8ee3f6d64b6fc7788fec5bc5fe
