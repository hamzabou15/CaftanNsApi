const express = require('express');
const app = express();
var mongoose = require('mongoose');
const Reviews = require('../caftanApi/api/Review');
const Register = require('../caftanApi/api/Register');
const Login = require('../caftanApi/api/Login');
const Contact = require('../caftanApi/api/Contact')
const News = require('../caftanApi/api/Newsletter')
const stripe = require('../caftanApi/api/Stripe')
const order = require('../caftanApi/api/Order')
const Products = require('../caftanApi/api/Products')



const cors = require('cors');
const dotenv = require('dotenv');



mongoose.set("strictQuery", false);
dotenv.config();


    mongoose.connect(process.env.MONGO_URL , {
       useNewUrlParser: true, useUnifiedTopology: true

    }).then(() =>  console.log("DB Connection Successfull")).catch((err) => console.log(err))




  app.listen(8080, () => console.log('back end is running '));

  const whitelist = ['http://192.168.0.190:3000/ ', ' http://localhost:3000/ ' ]
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error())
      }
    }
  }
  app.use(cors({
      origin:"*",
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));


app.use(express.json()); /// pour le envoi
app.use("/api/products" , Products )
app.use("/api/product" , Reviews )
app.use("/api/register" , Register )
app.use("/api/login" , Login )
app.use("/api/contact" , Contact )
app.use('/api/newsletter' , News)
app.use('/api' , stripe)
app.use('/api/orders' , order)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



