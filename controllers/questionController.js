import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";
import * as CustomError from "../errors/index.js";
import User from "../models/User.js";
import UserQuestionData from "../models/UserQuestionData.js";
import { findUserQuestion } from "../utils/userQuestionData.js";
import {
  getNumFlaggedQuestions,
  getNumIncorrectQuestions,
  getNumLeastSeenQuestions,
} from "../utils/index.js";

const createQuestion = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  if (user.role !== "admin") {
    throw new CustomError.UnauthorizedError(
      "You are not authorized to add questions!"
    );
  }
  const { questionText, answers, imageURL, questionCategory } = req.body;

  if (!questionText || answers.length < 4) {
    throw new CustomError.BadRequestError(
      "please provide the question text and all answers"
    );
  }

  const question = await Question.create({
    questionText,
    answers,
    imageURL,
    category: questionCategory,
  });
  res.status(StatusCodes.CREATED).json({ question });
};

const getTestQuestions = async (req, res) => {
  const testQuestions = await Question.find({});
  res.status(StatusCodes.OK).json({ testQuestions });
};

const getCategoryLength = async (req, res) => {
  const { category } = req.params;
  const numOfQuestions = await Question.find({
    category: { $regex: category, $options: "i" },
  }).countDocuments();

  res.status(StatusCodes.OK).json({ numOfQuestions });
};

const getOtherPractice = async (req, res) => {
  const { testType } = req.body;
  const user = req.user.userId;

  let numOfQuestions = 0;
  if (testType === "/flagged") {
    numOfQuestions = await getNumFlaggedQuestions(user);
  }
  if (testType === "/least-seen") {
    numOfQuestions = await getNumLeastSeenQuestions(user);
  }
  if (testType === "/incorrect") {
    numOfQuestions = await getNumIncorrectQuestions(user);
  }

  res.status(StatusCodes.OK).json({ numOfQuestions });
};

const getQuestionsRead = async (req, res) => {
  const { category } = req.params;
  let questions;
  if (category === "all") {
    questions = await Question.find({});
  } else {
    questions = await Question.find({
      category: { $regex: category, $options: "i" },
    });
  }
  const userQuestionData = await UserQuestionData.findOne({
    user: req.user.userId,
  });

  let tempQuestions = [];

  for (let question of questions) {
    let tempQuestion = { question };

    const updateItem = findUserQuestion({
      id: question._id.toString(),
      userQuestionData,
    });

    if (!updateItem) {
      const userQuestion = { question: question._id };
      userQuestionData.questions.push(userQuestion);
      await userQuestionData.save();
    }

    tempQuestion.isFlagged = updateItem?.isFlagged || false;

    tempQuestions.push(tempQuestion);
  }
  questions = [...tempQuestions];

  res.status(StatusCodes.OK).json({ questions });
};

export {
  getTestQuestions,
  createQuestion,
  getQuestionsRead,
  getCategoryLength,
  getOtherPractice,
};
