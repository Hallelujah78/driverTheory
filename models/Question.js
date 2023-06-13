import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "control of vehicle",
        "legal matters/rules of the road",
        "managing risk",
        "safe and socially responsible driving",
        "technical matters",
      ],
      default: "control of vehicle",
    },
    imageURL: { type: String, default: "" },
    questionText: {
      type: String,
      required: [true, "please provide question text"],
    },
    answers: [],
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
