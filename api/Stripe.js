const router = require('express').Router();
const stripe = require('stripe')('sk_test_51MqM4ZBpjSMLg4YD5xSs9APImvnWyuWGdyfPJnPGTs7viXdLRqOTrTTqo5EnQb7M3Ab5n00WnREpfIbyQX0LxKWE00yVB9FkNE');



router.post('/payment', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: req.body.currency,
        description: 'Payment for myapp',
        // Ajoutez ici d'autres options de paiement si nécessaire
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

module.exports = router;
