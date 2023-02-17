const { Schema, model, default: mongoose } = require("mongoose");

const sesionSchema = new Schema(
    {
       dj:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dj"
       },
       picture: {
        type: String,
        required: [true, "picture is required"],
       },
       link: {
        type: String,
        required: [true, "link is required"],
       },
    },
    {
        timestamps: true
    }
);

const Sesion = model("Sesion", sesionSchema);
module.exports = Sesion;