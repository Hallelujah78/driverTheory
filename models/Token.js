import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: [true, "please provide a refreshToken"],
    },
    ip: { type: String, required: [true, "ip is required"] },
    userAgent: { type: String, required: [true, "please provide a userAgent"] },
    isValid: { type: Boolean, default: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Token", TokenSchema);
