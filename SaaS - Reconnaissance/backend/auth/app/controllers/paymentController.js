// paymentController.js
const Stripe = require('stripe');

// Initialiser Stripe avec la clé secrète
const stripe = Stripe('sk_test_51PsJwW1LN3zHLKchLBzWNJFSGHk9RaIuchDi9eG7Lk7UH0V2ack46dRJ6hzmucypfLFMwtDL30E65ScaJapdUzsH00xTKaR3Lz');

// Créer une intention de paiement
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Créer une intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
    });

    // Envoyer le client_secret au frontend
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};
