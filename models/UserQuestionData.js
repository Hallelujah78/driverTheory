import mongoose from "mongoose";

const QuestionHistorySchema = new mongoose.Schema({
  question: { type: mongoose.Types.ObjectId, ref: "Question", required: true },
  timesSeen: { type: Number, default: 0 },
  lastAnswerCorrect: { type: Boolean, default: true },
  isFlagged: { type: Boolean, default: false },
});

const UserQuestionDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    questions: {
      type: [QuestionHistorySchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserQuestionData", UserQuestionDataSchema);
