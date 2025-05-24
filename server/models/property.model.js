import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    thumbnail: { type: String, required: true },
    propertyPhotos: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
