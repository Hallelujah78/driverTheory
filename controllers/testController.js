import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";
import Test from "../models/Test.js";
import * as CustomError from "../errors/index.js";
import { shuffleArray, createResults } from "../utils/index.js";
import mongoose from "mongoose";
import moment from "moment";
import {
  findUserQuestion,
  updateUserQuestionData,
} from "../utils/userQuestionData.js";
import UserQuestionData from "../models/UserQuestionData.js";

const setIsResult = async (user) => {
  const completeTests = await Test.find({
    user,
    isResult: false,
    isComplete: true,
  });
  if (completeTests.length < 1) {
    return;
  }
  completeTests.forEach(async (test) => {
    test.isResult = true;
    await test.save();
  });
};

// create test
const createTest = async (req, res) => {
  const user = req.user.userId;
  setIsResult(user);
  const { testCategory: category, numQuestions } = req.body;
  if (!category) {
    throw new CustomError.BadRequestError("please provide the test category");
  }
  const testQuestions = await Question.find({}).limit(12);
  const userQuestionData = await UserQuestionData.findOne({
    user: req.user.userId,
  });

  let questions = [];

  for (let question in testQuestions) {
    const questionId = testQuestions[question]._id.toString();
    let isFlaggedStatus;
    let userQuestion = findUserQuestion({
      id: questionId,
      userQuestionData,
    });

    isFlaggedStatus = userQuestion?.isFlagged;

    if (!userQuestion) {
      const question = { question: questionId };
      userQuestionData.questions.push(question);
      await userQuestionData.save();
    }

    shuffleArray(testQuestions[question].answers);
    let testQuestion = {
      question: testQuestions[question],
      userAnswer: "",
      isCorrect: false,
      isFlagged: isFlaggedStatus || false,
    };
    questions.push(testQuestion);
  }

  const test = await Test.create({
    user,
    questions,
    category,
  });

  res.status(StatusCodes.CREATED).json({ test });
};

// end of createTest

// get test
const getTest = async (req, res) => {
  // get test for specific user
  const user = req.user.userId;

  const test = await Test.findOne({ user, isResult: false });

  if (!test || test?.length < 1) {
    throw new CustomError.NotFoundError(
      "there are no active tests to complete"
    );
  }
  let results = {};
  if (test.isComplete && !test.isResult) {
    results = createResults(test);
  }

  res.status(StatusCodes.OK).json({ test, results });
};

// show stats
const showStats = async (req, res) => {
  let stats = await Question.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Question.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

const deleteTest = async (req, res) => {
  setIsResult(req.user.userId);
  const tests = await Test.find({ user: req.user.userId, isComplete: false });
  if (!tests) {
    throw new CustomError.NotFoundError(`no tests found`);
  }
  // checkPermissions(req.user, question.createdBy);

  await Test.deleteMany({ user: req.user.userId, isComplete: false });

  res.status(StatusCodes.OK).json({ msg: "tests deleted successfully!" });
};

// update test

const updateTest = async (req, res) => {
  const { questionId, index, currentQuestion } = req.body;

  if (!questionId || !isFinite(index) || !isFinite(currentQuestion)) {
    throw new CustomError.BadRequestError(
      "please provide the question ID and the index of the current question"
    );
  }
  const test = await Test.findOne({ user: req.user.userId, isComplete: false });

  if (!test) {
    throw new CustomError.NotFoundError(`test not found`);
  }

  test.questions[currentQuestion].userAnswer = index;

  test.questions[currentQuestion].isCorrect =
    test.questions[currentQuestion].question.answers[index].isCorrect;

  if (currentQuestion + 1 === test.questions.length) {
    test.isComplete = true;
    updateUserQuestionData({ user: req.user.userId, test });
  }
  await test.save();

  res.status(StatusCodes.OK).json({ test });
};

const toggleFlagged = async (req, res) => {
  const { questionId } = req.body;
  if (!questionId) {
    throw new CustomError.BadRequestError("please provide a question ID");
  }

  const test = await Test.findOne({
    user: req.user.userId,
    isResult: false,
  });
  const updateItem = test.questions.find((item) => {
    return questionId === item.question._id.toString();
  });

  updateItem.isFlagged = !updateItem.isFlagged;
  await test.save();

  const userQuestionData = await UserQuestionData.findOne({
    user: req.user.userId,
  });
  if (!userQuestionData) {
    throw new CustomError.NotFoundError("user question data not found");
  }
  const userQuestionToUpdate = findUserQuestion({
    id: questionId,
    userQuestionData,
  });
  userQuestionToUpdate.isFlagged = !userQuestionToUpdate.isFlagged;
  await userQuestionData.save();

  res.status(StatusCodes.OK).json({ test });
};

export { getTest, deleteTest, updateTest, createTest, toggleFlagged };
