// paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');

// Définir la route pour créer une intention de paiement
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
