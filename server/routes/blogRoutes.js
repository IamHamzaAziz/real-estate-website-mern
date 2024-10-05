import express from "express";
import Blog from "../models/BlogModel.js";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
import slugify from "slugify";

const blogRouter = express();

blogRouter.post("/create-blog", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const { title, content, summary } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "real_estate_mern/blogs",
      width: 500,
      height: 500,
    });

    const slug = slugify(title) + "-" + Date.now();

    await Blog.create({
      title: title,
      blogSlug: slug,
      content: content,
      summary: summary,
      image: result.secure_url,
    });

    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

export default blogRouter;
