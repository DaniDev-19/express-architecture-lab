require('dotenv').config();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
};

module.exports = {
  corsOptions,
};