import Property from "../models/property.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import slugify from "slugify";

export const createProperty = async (req) => {
  if (!req.files || !req.files.thumbnail) {
    throw new Error("Thumbnail image is required");
  }

  const {
    title, price, area, location, city, description, whatsapp, email, type
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
};

export const getAllProperties = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  const { city, type } = req.query;
  const query = {};
  if (city && city.trim()) query.city = city;
  if (type && type.trim()) query.type = type;

  const properties = await Property.find(
    query,
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

  return properties;
};

export const getPropertyBySlug = async (slug) => {
  return Property.findOne({ slug }, { updatedAt: 0 });
};

export const updateProperty = async (req) => {
  const {
    title, price, area, location, city, description, whatsapp, email, type
  } = req.body;

  const property = await Property.findOne({ slug: req.params.slug });
  if (!property) {
    throw new Error("Property not found");
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

  await property.save();
};

// Check if a property is saved by the user
export const checkSavedProperty = async (userId, propertyId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.savedProperties.includes(propertyId);
};