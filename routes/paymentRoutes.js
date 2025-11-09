const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
router.post('/create-checkout-session', async (req,res) => {
  const { price_id, customer_email } = req.body;
  if(!price_id) return res.status(400).json({ error: 'price_id required' });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: price_id, quantity: 1 }],
      mode: 'payment',
      customer_email: customer_email,
      success_url: process.env.SUCCESS_URL || 'https://example.com/success',
      cancel_url: process.env.CANCEL_URL || 'https://example.com/cancel'
    });
    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'stripe_error', detail: err.message });
  }
});
module.exports = router;
