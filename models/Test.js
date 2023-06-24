import mongoose from "mongoose";

export const TestQuestionSchema = new mongoose.Schema({
  // the test questions which include questions and whether the answer is correct etc
  question: {
    type: {},
    required: true,
  },
  userAnswer: { type: Number, default: null },
  isCorrect: { type: Boolean },
  selected: { type: Number, default: null },
  isFlagged: { type: Boolean, default: false },
});

const TestSchema = new mongoose.Schema(
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
    isComplete: {
      type: Boolean,
      default: false,
    },
    isResult: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Test", TestSchema);
