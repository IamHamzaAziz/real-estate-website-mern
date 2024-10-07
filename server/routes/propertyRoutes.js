import express from "express";
import Property from "../models/PropertyModel.js";
import upload from "../middleware/multer.js";
import { uploadPropertyPhotos } from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
import slugify from "slugify";

const propertyRouter = express();

propertyRouter.post(
  "/create-property",
  uploadPropertyPhotos,
  async (req, res) => {
    try {
      if (!req.files || !req.files.thumbnail) {
        return res.status(400).json({ message: "Thumbnail image is required" });
      }

      const {
        title,
        price,
        area,
        location,
        city,
        description,
        whatsapp,
        email,
        type,
      } = req.body;

      const thumbnailResult = await cloudinary.uploader.upload(
        req.files.thumbnail[0].path,
        {
          folder: "real_estate_mern/property_thumbnail",
          width: 500,
          height: 500,
        }
      );

      let photosUrls = [];
      if (req.files.propertyPhotos) {
        for (const file of req.files.propertyPhotos) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "real_estate_mern/property_photos",
            width: 500,
            height: 500,
          });
          photosUrls.push(result.secure_url);
        }
      }

      const slug =
        slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g }) +
        "-" +
        Date.now();

      await Property.create({
        title,
        slug,
        price,
        area,
        location,
        city,
        description,
        whatsapp,
        email,
        type,
        thumbnail: thumbnailResult.secure_url,
        propertyPhotos: photosUrls,
      });

      res.status(200).json({ message: "Property created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }
);

export default propertyRouter;
