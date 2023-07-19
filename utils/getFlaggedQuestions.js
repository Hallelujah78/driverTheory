import UserQuestionData from "../models/UserQuestionData.js";
import mongoose from "mongoose";

const getNumFlaggedQuestions = async (userId) => {
  let numFlaggedQuestions = await UserQuestionData.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $unwind: "$questions" },
    { $replaceRoot: { newRoot: "$questions" } },
    { $match: { $expr: { $eq: ["$isFlagged", true] } } },
    { $project: { question: 1, _id: 0 } },
  ]);
  return numFlaggedQuestions.length;
};
export default getNumFlaggedQuestions;
