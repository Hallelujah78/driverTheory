import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";
import Test from "../models/Test.js";
import * as CustomError from "../errors/index.js";
import { shuffleArray } from "../utils/index.js";
import mongoose from "mongoose";
import moment from "moment";

// create test
const createTest = async (req, res) => {
  // will expect test category and number of questions (in some cases) to create test
  const user = req.user.userId;

  const { testCategory: category, numQuestions } = req.body;
  if (!category) {
    throw new CustomError.BadRequestError("please provide the test category");
  }
  const testQuestions = await Question.find({});

  let questions = [];

  for (const question in testQuestions) {
    shuffleArray(testQuestions[question].answers);
    let testQuestion = {
      question: testQuestions[question],
      userAnswer: "",
      isCorrect: false,
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

  const test = await Test.find({ user });

  res.status(StatusCodes.OK).json({ test });
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
    { $limit: 6 },
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
  const test = await Test.findOne({ user: req.user.userId });
  if (!test) {
    throw new CustomError.NotFoundError(`no test found`);
  }
  // checkPermissions(req.user, question.createdBy);

  await Test.deleteOne({ _id: test._id });

  res.status(StatusCodes.OK).json({ msg: "test deleted successfully!" });
};

// update test

const updateTest = async (req, res) => {
  const { questionId, index, currentQuestion } = req.body;

  if (!questionId || !isFinite(index) || !isFinite(currentQuestion)) {
    throw new CustomError.BadRequestError(
      "please provide the question ID and the index of the current question"
    );
  }
  const test = await Test.findOne({ user: req.user.userId });

  if (!test) {
    throw new CustomError.NotFoundError(`test not found`);
  }

  // checkPermissions(req.user, question.createdBy);

  test.questions[currentQuestion].userAnswer = index;
  const updatedTest = await test.save();
  res.status(StatusCodes.OK).json({ test: updatedTest });
};

export { getTest, deleteTest, updateTest, createTest };
