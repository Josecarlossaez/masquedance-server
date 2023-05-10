const {Schema, model, default: mongoose } = require("mongoose")

const colectionSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",   
        },
        picture: {
            type: String,
            required: [true, "picture is required"]
        },
        
    },
    {
        timestamps: true
    }
);

const Colection = model("Colection", colectionSchema);

module.exports = Colection;