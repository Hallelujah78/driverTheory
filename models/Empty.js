import mongoose from "mongoose";

const EmptySchema = new mongoose.Schema(
  {
    // properties
  },
  { timestamps: true }
);

export default mongoose.model("Empty", EmptySchema);
