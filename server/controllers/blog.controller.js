import { blogService } from "../services/index.js";

export async function getBlogs(req, res) {
  try {
    const { page, limit } = req.query;
    const blogs = await blogService.getBlogs(page, limit);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getBlogBySlug(req, res) {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(404).json({ message: "Blog not found" });
    console.log(error);
  }
}

export async function getLatestThreeBlogs(req, res) {
  try {
    const blogs = await blogService.getLatestThreeBlogs(req.params.slug);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createBlog(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: "No image provided" });
    const { title, content, summary } = req.body;
    await blogService.createBlog({ title, content, summary }, req.file);
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

export async function updateBlog(req, res) {
  try {
    const { slug } = req.params;
    const { title, content, summary } = req.body;
    await blogService.updateBlog(slug, { title, content, summary }, req.file);
    res.status(200).json("Blog updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error updating blog:", error);
  }
}

export async function searchBlogs(req, res) {
  try {
    const { title } = req.body;
    const blogs = await blogService.searchBlogs(title);
    res.json(blogs);
  } catch (error) {
    res.status(500).json("Server Error");
    console.error(error);
  }
}