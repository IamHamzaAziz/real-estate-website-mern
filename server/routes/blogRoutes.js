import express from "express";
import Blog from "../models/BlogModel.js";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
import slugify from "slugify";

const blogRouter = express();

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
      await Blog.findOne({ blogSlug: req.params.slug }, { updatedAt: 0 })
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

blogRouter.put(
  "/update-blog/:slug",
  upload.single("image"),
  async (req, res) => {
    try {
      const { slug } = req.params;
      const { title, content, summary } = req.body;

      // Find the blog post by slug
      const blog = await Blog.findOne({ blogSlug: slug });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      let imageUrl = blog.image; // Default to the current image
      // If a new image is provided, upload it to Cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "real_estate_mern/blogs",
          width: 500,
          height: 500,
        });
        imageUrl = result.secure_url; // Update the image URL if a new image is uploaded
      }

      // Update the blog post
      blog.title = title;
      blog.content = content;
      blog.summary = summary;
      blog.image = imageUrl; // Use the new image URL if uploaded

      await blog.save();

      res.status(200).json("Blog updated successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error("Error updating blog:", error);
    }
  }
);

export default blogRouter;
