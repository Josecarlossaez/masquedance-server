// EXPRESS
const router = require("express").Router()

// USER IS LOGGED
const { isAuthenticated } = require("../middlewares/auth.middleware") 

const User = require("../models/User.model")

// * ORDER ROUTES *

// POST "/order/create" => Create new order
router.post("/create", isAuthenticated, async(req, res, next) => {
   const {orderNumber, username, mail, orderCart, total} = req.body
   
   const Order = {
    orderNumber: orderNumber,
    username: username,
    mail: mail,
    orderCart:{orderCart},
    total: total,
   }
})


module.exports = router;