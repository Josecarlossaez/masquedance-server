const { Schema, model, default: mongoose } = require("mongoose");

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        picture: {
            type: String,
            required: [true, "picture is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"]
        },
    },
    {
        timestamps: true
    }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;