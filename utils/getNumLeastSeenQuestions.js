import Question from "../models/Question.js";
import mongoose from "mongoose";

const getNumLeastSeenQuestions = async (userId) => {
  let numLeastSeenQuestions = await Question.countDocuments({});
  return numLeastSeenQuestions;
};
export default getNumLeastSeenQuestions;
