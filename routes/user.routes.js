// EXPRESS
const router = require("express").Router()

// USER IS LOGGED
const { isAuthenticated } = require("../middlewares/auth.middleware") 

const User = require("../models/User.model")

// * USER ROUTES *

// GET "/user/cart" => List all cart products

router.get("/cart", isAuthenticated, async(req, res, next) => {
    try {
       const response = await User.findById(req.payload._id).populate("cart")
       res.status(200).json(response.cart)
    
   } catch (error) {
    next(error)
   }

})

module.exports = router;