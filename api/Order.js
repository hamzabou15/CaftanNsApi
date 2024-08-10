const router = require('express').Router();

const Order = require('../models/Order');



router.get('/' , async (req, res) => {



    try {
        
        const findOrders = await Order.find({});
        res.status(200).json(findOrders)

    } catch (error) {
        res.status(404).json(error)
    }

})
router.post('/', async (req, res) => {
    try {
      const newOrder = await Order.create(req.body); // Problème : L'objet Order doit être créé avec le constructeur new Order()
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order' }); // Problème : Gestion d'erreur insuffisante
    }
  });

  
module.exports = router;