import { StatusCodes } from "http-status-codes";
import UserQuestionData from "../models/UserQuestionData.js";
import Question from "../models/Question.js";
import * as CustomError from "../errors/index.js";

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
