// EXPRESS
const router = require("express").Router();

// TRANSPORTER FROM NODEMAILER.MIDDLEWARE

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'masqdancedev@gmail.com',
        pass: 'developermasqdance'
    }
})

// const transporter = require("../middlewares/nodemailer.middleware")


// USER IS LOGGED
const { isAuthenticated } = require("../middlewares/auth.middleware");

const Order = require("../models/Order.model");

const User = require("../models/User.model");

// * ORDER ROUTES *

// POST "/order/create" => Create new order
router.post("/create", isAuthenticated, async (req, res, next) => {

  const {
    username,
    email,
    orderCart,
    total,
    name,
    address,
    cp,
    town,
    province,
    country,
  } = req.body;
 


  const order = {
    username: username,
    email: email,
    orderCart: orderCart,
    total: total,
    name: name,
    address: address,
    cp: cp,
    town: town,
    province: province,
    country: country,
  };
 
  try {
    await Order.create(order);
    res.status(200).json("order created successfully");
  } catch (error) {
    next(error);
  }

  // SEND EMAIL TO USER AND OWNER.
  // CONFIGURATION

  const userMailOptions = {
    from: 'masqdancedev@gmail.com',
    to: email,
    subject: `Pedido: ${order._id}`,
    text: `Hola ${name}, muchas gracias por confiar en +QDance. Ha realizado el siguiente pedido: ${order}`
  }

  const ownerMailOptions = {
    from: 'masqdancedev@gmail.com',
    to: 'jcsaezfernandez@gmail.com',
    subject: `Pedido: ${order._id}`,
    text: ` El usuario ${email} ha realizado el siguiente pedido ${order}` 
    
  }
   // SENDING
   transporter.sendMail(userMailOptions, (error, info) => {
    if(error){
      console.log("error enviando mail al destinatario",error);
    }else{
      console.log("correo enviado al destinatario: ", info.response);
    }
   });

   transporter.sendMail(ownerMailOptions, (error, info) => {
    if(error) {
      console.log("error enviando mail al propietario");
    } else {
      console.log("correo enviado al propietario: ", info.response);
    }
   })


});

module.exports = router;
