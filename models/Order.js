const mongoose = require('mongoose');
require('mongoose-double')(mongoose)

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  guestEmail: {
    type: String
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      priceOfProduct: {
        type:Number  ,
        required: true
      },
      size: {
        type:String  ,
        required: true
      }
    }
  ],
  totalAmount: {
    type: String,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  emailClient : {
    type: String,
    required: true,
  },
  idClient : {
    type:String,
    required:false
  },
  idOrder : {
    type:String,
    required:true
  },
  currency: {
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema); // Correction de l'exportation du modèle
