import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, default: false },
    savedProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
