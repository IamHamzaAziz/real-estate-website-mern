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

    const slug =
      slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g }) +
      "-" +
      Date.now();

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

blogRouter.get("/get-blogs", async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skip = (page - 1) * limit;

    res.json(
      await Blog.find({}, { content: 0, updatedAt: 0 })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

blogRouter.get("/get-blog/:slug", async function (req, res) {
  try {
    res.json(
      await Blog.findOne(
        { blogSlug: req.params.slug },
        { summary: 0, updatedAt: 0 }
      )
    );
  } catch (error) {
    res.status(404).json({ message: "Blog not found" });
    console.log(error);
  }
});

blogRouter.get("/latest-three-blogs/:slug", async function (req, res) {
  try {
    res.json(
      await Blog.find(
        { blogSlug: { $ne: req.params.slug } },
        { content: 0, updatedAt: 0 }
      )
        .sort({ createdAt: -1 })
        .limit(3)
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default blogRouter;
