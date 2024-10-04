import express from "express";
import Blog from "../models/BlogModel";
import upload from "../middleware/multer";
import cloudinary from "../utils/cloudinary";
import slug from "slug";

const authRouter = express();

authRouter.post("/create-blog", upload.single("image"), async (req, res) => {
  try {
    const { title, content, summary } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "real_estate_mern/blogs",
      width: 500,
      height: 500,
      crop: "fill",
    });

    const slug = slug(title) + "-" + Date.now();

    await Blog.create({
      title: title,
      slug: slug,
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
