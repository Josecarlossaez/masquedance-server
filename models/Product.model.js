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
        cantidadSizeS: {
            type: Number,
            default: "No necesita talla"
        },
        cantidadSizeM: {
            type: Number,
            default: "No necesita talla"
        },
        cantidadSizeL: {
            type: Number,
            default: "No necesita talla"
        },
        cantidadSizeXL: {
            type: Number,
            default: "No necesita talla"
        },
        cantidadSizeXXL: {
            type: Number,
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