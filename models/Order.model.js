const { Schema, model, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
    {

       date: {
        type: Date,
        default: Date.now
       },
       username: {
        type: String,
        required: [true, "username is required"]
       },
       email: {
        type: String,
        required: [true, "mail is required"]
       },
       orderCart: {
        type: Object
       },
       total: {
        type: Number,
        required: [true, "total is required"]
       },
       state: {
        type: String,
        enum:["pending", "delivered","canceled" ],
        default: "pending"
       },
    },
    {
        timestamps: true,
    }
);
const Order = model("Order", orderSchema);
module.exports = Order;