import { StatusCodes } from "http-status-codes";
import UserQuestionData from "../models/UserQuestionData.js";
import Question from "../models/Question.js";
import * as CustomError from "../errors/index.js";

// const deleteUserQuestionData = async (req, res) => {
//   const { id: questionDataId } = req.params;
//   const questionData = await UserQuestionData.findOne({ _id: questionDataId });
//   if (!questionData) {
//     throw new CustomError.NotFoundError(
//       `no questionData with id ${questionDataId}`
//     );
//   }
//   // checkPermissions(req.user, questionData.createdBy);

//   await UserQuestionData.deleteOne({ _id: questionDataId });

//   res
//     .status(StatusCodes.OK)
//     .json({ msg: "questionData deleted successfully!" });
// };

// const toggleIsFlaggedStatus = async (req, res) => {
//   const { questionId } = req.body;
//   const { user } = req.user.userId;

//   const userQuestionData = await UserQuestionData.findOne({
//     user: req.user.userId,
//   });
//   if (!userQuestionData) {
//     throw new CustomError.NotFoundError("user question data not found");
//   }
//   const updateItem = findUserQuestion({ id: questionId, userQuestionData });
//   updateItem.isFlagged = !updateItem.isFlagged;
//   await userQuestionData.save();
//   res
//     .status(StatusCodes.OK)
//     .json({ msg: "flagged status updated successfully" });
// };

const getOverviewResults = async (req, res) => {
  let unseen;

  const total = await Question.countDocuments({});

  const userQuestions = await UserQuestionData.findOne(
    { user: req.user.userId },
    "questions"
  );
  unseen = total - userQuestions.questions.length;

  const neverAnswered = userQuestions.questions.reduce((acc, curr) => {
    if (curr.numTimesAnswered === 0) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
  unseen = unseen + neverAnswered;
  const seen = total - unseen;
  const stats = [];
  const seenStats = {};
  seenStats.title = "Questions seen";
  seenStats.total = total;
  seenStats.numerator = seen;
  stats.push(seenStats);

  // incorrectly answered - this is incorrectly answered of those questions you have seen
  const incorrectlyAnswered = userQuestions.questions.reduce((acc, curr) => {
    const { lastAnswerCorrect, numTimesAnswered } = curr;
    if (curr.lastAnswerCorrect === false) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
  const incorrectStats = {};

  incorrectStats.title = "Incorrectly answered";
  incorrectStats.total = seen;
  incorrectStats.numerator = incorrectlyAnswered;
  stats.push(incorrectStats);
  // correctly answered of those questions you have seen
  const correctStats = {};

  correctStats.title = "Correctly answered";
  correctStats.total = seen;
  correctStats.numerator = seen - incorrectlyAnswered;
  stats.push(correctStats);

  res.status(StatusCodes.OK).json({ stats });
};

export { getOverviewResults };
