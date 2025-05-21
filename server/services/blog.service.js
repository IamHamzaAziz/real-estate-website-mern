import Blog from "../models/BlogModel.js";
import cloudinary from "../utils/cloudinary.js";
import slugify from "slugify";

export async function getBlogs(page = 1, limit = 3) {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  return Blog.find({}, { content: 0, updatedAt: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
}

export async function getBlogBySlug(slug) {
  return Blog.findOne({ blogSlug: slug }, { updatedAt: 0 });
}

export async function getLatestThreeBlogs(excludeSlug) {
  return Blog.find(
    { blogSlug: { $ne: excludeSlug } },
    { content: 0, updatedAt: 0 }
  )
    .sort({ createdAt: -1 })
    .limit(3);
}

export async function createBlog({ title, content, summary }, file) {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "real_estate_mern/blogs",
    width: 500,
    height: 500,
  });

  const slug =
    slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g }) +
    "-" +
    Date.now();

  return Blog.create({
    title,
    blogSlug: slug,
    content,
    summary,
    image: result.secure_url,
  });
}

export async function updateBlog(slug, { title, content, summary }, file) {
  const blog = await Blog.findOne({ blogSlug: slug });
  if (!blog) throw new Error("Blog not found");

  let imageUrl = blog.image;
  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "real_estate_mern/blogs",
      width: 500,
      height: 500,
    });
    imageUrl = result.secure_url;
  }

  blog.title = title;
  blog.content = content;
  blog.summary = summary;
  blog.image = imageUrl;

  await blog.save();
}

export async function searchBlogs(title) {
  return Blog.find(
    { title: { $regex: title, $options: "i" } },
    { content: 0, updatedAt: 0 }
  );
}