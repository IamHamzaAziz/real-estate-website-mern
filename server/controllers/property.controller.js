import * as propertyService from "../services/property.service.js";

// Create Property
export const createProperty = async (req, res) => {
  try {
    const result = await propertyService.createProperty(req);
    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Get All Properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties(req);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Get Property by Slug
export const getPropertyBySlug = async (req, res) => {
  try {
    const property = await propertyService.getPropertyBySlug(req.params.slug);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(404).json({ message: "Property not found" });
    console.log(error);
  }
};

// Update Property
export const updateProperty = async (req, res) => {
  try {
    await propertyService.updateProperty(req);
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Check Saved Property
export const checkSavedProperty = async (req, res) => {
  try {
    const isSaved = await propertyService.checkSavedProperty(req.body.userId, req.body.propertyId);
    res.status(200).json({ isSaved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};