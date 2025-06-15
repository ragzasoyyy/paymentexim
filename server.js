// server.js

const express = require('express');
const path = require('path');
const app = express();

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
const createPayment = require('./api/create-payment');
const statusCheck = require('./api/status-check');
const webhook = require('./api/webhook');
const login = require('./auth/login');
const authMiddleware = require('./auth/middleware');

// VIEW ROUTES (UI)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));
app.get('/checkout', (req, res) => res.sendFile(path.join(__dirname, 'views', 'checkout.html')));
app.get('/success', (req, res) => res.sendFile(path.join(__dirname, 'views', 'success.html')));
app.get('/docs', (req, res) => res.sendFile(path.join(__dirname, 'views', 'docs.html')));

// API ROUTES
app.post('/api/create-payment', authMiddleware, createPayment);
app.post('/api/status-check', authMiddleware, statusCheck);
app.post('/api/webhook', webhook); // Optional, tidak pakai auth

// AUTH (Dummy Login Example)
app.post('/auth/login', login);

// Server run
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ RagzPay server running on port ${PORT}`);
});