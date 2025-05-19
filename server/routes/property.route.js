import express from "express";
import { 
  createPropertyController, 
  getAllPropertiesController, 
  getPropertyBySlugController, 
  updatePropertyController, 
  checkSavedPropertyController 
} from "../controllers/property.controller.js";
import { uploadPropertyPhotos } from "../middleware/multer.js";

const propertyRouter = express.Router();

propertyRouter.post("/create-property", uploadPropertyPhotos, createPropertyController);
propertyRouter.get("/all-properties", getAllPropertiesController);
propertyRouter.get("/get-property/:slug", getPropertyBySlugController);
propertyRouter.put("/update-property/:slug", uploadPropertyPhotos, updatePropertyController);
propertyRouter.post("/check-saved-property", checkSavedPropertyController);

export default propertyRouter;