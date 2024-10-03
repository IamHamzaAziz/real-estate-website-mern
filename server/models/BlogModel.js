import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);
export default Blog;
