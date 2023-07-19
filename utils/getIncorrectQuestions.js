import UserQuestionData from "../models/UserQuestionData.js";
import mongoose from "mongoose";

const getNumIncorrectQuestions = async (userId) => {
  let numIncorrectQuestions = await UserQuestionData.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $unwind: "$questions" },
    { $replaceRoot: { newRoot: "$questions" } },
    { $match: { $expr: { $eq: ["$lastAnswerCorrect", false] } } },
    { $project: { question: 1, _id: 0 } },
  ]);
  return numIncorrectQuestions.length;
};
export default getNumIncorrectQuestions;
