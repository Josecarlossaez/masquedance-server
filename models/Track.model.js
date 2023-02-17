const { Schema, model, default: mongoose } = require("mongoose");

const trackSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        picture: {
            type: String,
            required: [true, "picture is required"],
        },
        dj: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dj",
            required: [true, "dj is required"]
        },
        link: {
            type: String,
            required: [true, "link is required"]
        }
    },
    {
        timestamps: true
    }
);

const Track = model("Track", trackSchema);

module.exports = Track;



