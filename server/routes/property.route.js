import express from "express";
import { propertyController } from "../controllers/index.js";
import { uploadPropertyPhotos } from "../middleware/multer.js";

const propertyRouter = express.Router();

propertyRouter.post("/create-property", uploadPropertyPhotos, propertyController.createProperty);
propertyRouter.get("/all-properties", propertyController.getAllProperties);
propertyRouter.get("/get-property/:slug", propertyController.getPropertyBySlug);
propertyRouter.put("/update-property/:slug", uploadPropertyPhotos, propertyController.updateProperty);
propertyRouter.post("/check-saved-property", propertyController.checkSavedProperty);

export default propertyRouter;