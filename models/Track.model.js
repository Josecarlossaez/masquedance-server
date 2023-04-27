const { Schema, model, default: mongoose } = require("mongoose");

const trackSchema = new Schema(
    {
        title: {
            type: String,
            required: [false, "title is required"],
        },
        picture: {
            type: String,
            required: [false, "picture is required"],
        },
        // dj: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Dj",
        //     required: [true, "dj is required"]
        // },
        audio: {
            type: String,
            required: [false, "audio is required"]
        }
    },
    {
        timestamps: true
    }
);

const Track = model("Track", trackSchema);

module.exports = Track;



