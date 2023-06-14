// EXPRESS
const router = require("express").Router();
const Stripe = require("stripe");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET)

// POST "/payment" => accept payment
router.post("/payment", isAuthenticated, async(req,res,next) => {
    const {id, amount,name } = req.body
    console.log("id,total", id,amount)
    try {
        const payment = await stripe.paymentIntents.create({
          amount,
          currency: "EUR",
          description: name,
          payment_method: id,
          confirm: true, //confirm the payment at the same time
        });
    
        console.log(payment);
    
        return res.status(200).json({ message: "Successful Payment" });
      } catch (error) {
        console.log(error);
        return res.json({ message: error.raw.message });
      }
})
module.exports = router;