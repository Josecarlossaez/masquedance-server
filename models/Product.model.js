const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema (
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        size: String,

        description: String,    
    },
    {
        timestamps: true
    }
);

const Product = model("Product", productSchema);

module.exports = Product;