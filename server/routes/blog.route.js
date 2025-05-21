import express from "express";
import upload from "../middleware/multer.js";
import * as blogController from "../controllers/blog.controller.js";

const blogRouter = express();

blogRouter.get("/get-blogs", blogController.getBlogs);
blogRouter.get("/get-blog/:slug", blogController.getBlogBySlug);
blogRouter.get("/latest-three-blogs/:slug", blogController.getLatestThreeBlogs);
blogRouter.post("/create-blog", upload.single("image"), blogController.createBlog);
blogRouter.put("/update-blog/:slug", upload.single("image"), blogController.updateBlog);
blogRouter.post("/search", blogController.searchBlogs);

export default blogRouter;