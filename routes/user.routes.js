// EXPRESS
const router = require("express").Router()

// USER IS LOGGED
const { isAuthenticated } = require("../middlewares/auth.middleware") 

const User = require("../models/User.model")

// * USER ROUTES *

// GET "/user/cart" => List all cart products



module.exports = router;