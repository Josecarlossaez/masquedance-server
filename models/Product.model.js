const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema (
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        picture:{
            type: String,
            required: [false, "picture is required"],
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        size: {
            type: String,
            default: "No necesita talla"
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