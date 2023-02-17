const { Schema, model, default: mongoose } = require("mongoose");

const videoSchema = new Schema(
    {
        link: {
            type: String,
            required: [true, "link is required"],
        },
        description: String,
    },
    {
        timestamps: true
    }
);

const Video = model("Video", videoSchema);

module.exports = Video;