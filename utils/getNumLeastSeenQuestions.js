import Question from "../models/Question.js";
import mongoose from "mongoose";

const getNumLeastSeenQuestions = async (userId) => {
  console.log("least seen");
  let numLeastSeenQuestions = await Question.countDocuments({});
  return numLeastSeenQuestions;
};
export default getNumLeastSeenQuestions;
