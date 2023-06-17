import mongoose from "mongoose";

import { TestQuestionSchema } from "./Test";

const ResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: [
        "practice",
        "official test",
        "problem questions",
        "least seen",
        "category practice",
      ],
    },
    questions: {
      type: [TestQuestionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", ResultSchema);
