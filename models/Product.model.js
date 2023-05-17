const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema (
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        picture:{
            type: String,
            required: [true, "picture is required"],
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        size: String,
        reference: Boolean,
        cantidad: {
            type: Number,
            default: "1"
        },
        stock: {
            type: Number,
            required: [true, "stock is required"]
        },
     
        color:{
            type: String,
            default: " Sin color determinado"
        },
        

        description: String,    
    },
    {
        timestamps: true
    }
);

const Product = model("Product", productSchema);

module.exports = Product;