const { Schema, model, default: mongoose } = require("mongoose");

const djSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        picture: {
            type: String,
            required: [true, "picture is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        sessions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Session"
            }
        ],

    },
    {
        timestamps: true,
    }
);

const Dj = model("Dj", djSchema);

module.exports = Dj;