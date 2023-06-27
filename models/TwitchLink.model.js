const { Schema, model, default: mongoose } = require("mongoose");

const twitchLinkSchema = new Schema (
    {
        link:{
            type: String,
            required: [true, " link is required "],
        },
        picture:{
            type: String,
            required: [true, " picture is required "]
        }
    },
    {
        timestamps: true
    }
);

const TwitchLink = model("Twitch", twitchLinkSchema);

module.exports = TwitchLink;