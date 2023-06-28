const { Schema, model, default: mongoose } = require("mongoose");

const videoSchema = new Schema(
    {
        link: {
            type: String,
            required: [true, "link is required"],
        },
        title: {
            type: String,
            required: [true, "title is required"]
        },
        dj: {
            type: String,
            required: [true, "dj is required"]
        },
        picture:{
            type: String,
            required: [true, "picture is required"]
        }
    },
    {
        timestamps: true
    }
);

const Video = model("Video", videoSchema);

module.exports = Video;