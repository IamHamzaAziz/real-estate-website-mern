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

propertyRouter.get("/all-properties", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    // Fetch the city and type query parameters
    const { city, type } = req.query;

    // Build the query object
    const query = {};
    if (city && city.trim()) {
      query.city = city;
    }
    if (type && type.trim()) {
      query.type = type;
    }

    const properties = await Property.find(
      query, // Use the constructed query object for filtering
      {
        propertyPhotos: 0,
        updatedAt: 0,
        description: 0,
        whatsapp: 0,
        email: 0,
      }
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

propertyRouter.get("/get-property/:slug", async (req, res) => {
  try {
    res.json(
      await Property.findOne({ slug: req.params.slug }, { updatedAt: 0 })
    );
  } catch (error) {
    res.status(404).json({ message: "Blog not found" });
    console.log(error);
  }
});

propertyRouter.put(
  "/update-property/:slug",
  uploadPropertyPhotos,
  async (req, res) => {
    try {
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

      const property = await Property.findOne({
        slug: req.params.slug,
      });
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      // Handle thumbnail update if a new one is uploaded
      if (req.files && req.files.thumbnail) {
        const thumbnailResult = await cloudinary.uploader.upload(
          req.files.thumbnail[0].path,
          {
            folder: "real_estate_mern/property_thumbnail",
            width: 500,
            height: 500,
          }
        );
        property.thumbnail = thumbnailResult.secure_url;
      }

      // Handle property photos update if new ones are uploaded
      if (req.files && req.files.propertyPhotos) {
        let photosUrls = [];
        for (const file of req.files.propertyPhotos) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "real_estate_mern/property_photos",
            width: 500,
            height: 500,
          });
          photosUrls.push(result.secure_url);
        }
        property.propertyPhotos = photosUrls;
      }

      // Update the other fields
      property.title = title;
      property.price = price;
      property.area = area;
      property.location = location;
      property.city = city;
      property.description = description;
      property.whatsapp = whatsapp;
      property.email = email;
      property.type = type;

      // Save updated property
      property.save();

      res.status(200).json({ message: "Property updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }
);

export default propertyRouter;
