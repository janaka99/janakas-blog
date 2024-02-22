import mongoose, { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
