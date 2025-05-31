import express from "express";
import upload from "../middleware/multer.js";
import { blogController } from "../controllers/index.js";

const blogRouter = express();

blogRouter.get("/get-blogs", blogController.getBlogs);
blogRouter.get("/get-blog/:slug", blogController.getBlogBySlug);
blogRouter.get("/latest-three-blogs/:slug", blogController.getLatestThreeBlogs);
blogRouter.post("/create-blog", upload.single("image"), blogController.createBlog);
blogRouter.put("/update-blog/:slug", upload.single("image"), blogController.updateBlog);
blogRouter.post("/search", blogController.searchBlogs);

export default blogRouter;