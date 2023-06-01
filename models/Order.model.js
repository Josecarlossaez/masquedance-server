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
       name: {
        type: String,
        required: [true, "name is required"]
       },
       address: {
        type: String,
        required: [true, "address is required"]
       },
       town: {
        type: String,
        required: [true, "town is required"]
       },
       cp: {
        type: String,
        required: [true, "cp is required"]
       },
       province: {
        type: String,
        required: [true, "province is required"]
       },
       country: {
        type: String,
        required: [true, "country is required"]
       },
    },
    {
        timestamps: true,
    }
);
const Order = model("Order", orderSchema);
module.exports = Order;