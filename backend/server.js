const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');



const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});


// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!', status: 'OK' });
});

// Start server with explicit success/error handling.
const server = app.listen(PORT);

server.on('listening', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}/api/health`);
});

server.on('error', (err) => {
  console.error(`Failed to start server on port ${PORT}:`, err.message);
  process.exit(1);
});