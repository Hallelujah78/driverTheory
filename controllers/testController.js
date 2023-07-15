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

const createTest = async (req, res) => {
  const user = req.user.userId;
  setIsResult(user);
  const { testCategory: category, numTestQuestions } = req.body;
  if (!category) {
    throw new CustomError.BadRequestError("please provide the test category");
  }
  const testQuestions = await Question.find({}).limit(numTestQuestions);
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

const getTest = async (req, res) => {
  const user = req.user.userId;
  const { testId } = req.params;

  if (testId) {
    const test = await Test.findOne({ user, _id: testId });

    if (!test || test?.length < 1) {
      throw new CustomError.NotFoundError("there is no test with that ID");
    }
    const userQuestionData = await UserQuestionData.findOne({ user });

    if (!userQuestionData) {
      throw new CustomError.NotFoundError(
        "there is no user question data for this user"
      );
    }
    if (userQuestionData.updatedAt - test.updatedAt > 10000) {
      test.questions.map((question) => {
        const userQuestion = findUserQuestion({
          id: question.question._id.toString(),
          userQuestionData,
        });
        question.isFlagged = userQuestion.isFlagged;
      });
      await test.save();
    }

    return res.status(StatusCodes.OK).json({ test });
  }

  // if no testId below this line
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

const showStats = async (req, res) => {
  const testStats = await Test.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          category: "$category",
          correct: {
            $sum: {
              $size: {
                $filter: { input: "$questions.isCorrect", cond: "$$this" },
              },
            },
          },
          total: {
            $sum: {
              $size: "$questions.isCorrect",
            },
          },
          createdAt: "$createdAt",
          date: {
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            year: { $year: "$createdAt" },
          },
        },
      },
    },
    { $project: { tempScore: { $divide: ["$_id.correct", "$_id.total"] } } },
    { $project: { score: { $multiply: ["$tempScore", 100] } } },
    { $sort: { "_id.createdAt": 1 } },
  ]);
  let stats = [];
  testStats.map((test) => {
    const {
      category,
      correct,
      total,
      createdAt,
      date: { month, day, year },
    } = test._id;
    stats.push({
      category,
      correct,
      total,
      date: `${
        moment()
          .month(month - 1)
          .format("MMM") +
        " " +
        day +
        ", " +
        moment().year(year).format("YY")
      }`,

      score: test.score,
      createdAt,
    });
  });

  res.status(StatusCodes.OK).json({ stats });
};

const deleteTest = async (req, res) => {
  setIsResult(req.user.userId);
  const tests = await Test.find({ user: req.user.userId, isComplete: false });
  if (!tests) {
    throw new CustomError.NotFoundError(`no tests found`);
  }
  await Test.deleteMany({ user: req.user.userId, isComplete: false });
  res.status(StatusCodes.OK).json({ msg: "tests deleted successfully!" });
};

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

  let results = {};
  if (currentQuestion + 1 === test.questions.length) {
    test.isComplete = true;
    updateUserQuestionData({ user: req.user.userId, test });
    results = createResults(test);
  } else {
    results = null;
  }
  await test.save();

  res.status(StatusCodes.OK).json({ test, results });
};

const toggleFlagged = async (req, res) => {
  const { questionId, testId } = req.body;
  const user = req.user.userId;

  if (!questionId) {
    throw new CustomError.BadRequestError(
      "please provide a question ID and a test ID"
    );
  }
  let test;
  if (testId) {
    test = await Test.findOne({ user, _id: testId });
    if (!test || test?.length < 1) {
      throw new CustomError.NotFoundError("there is no test with that ID");
    }
  } else {
    test = await Test.findOne({
      user: req.user.userId,
      isResult: false,
    });
  }

  if (test) {
    const updateItem = test.questions.find((item) => {
      return questionId === item.question._id.toString();
    });
    updateItem.isFlagged = !updateItem.isFlagged;
    await test.save();
  }

  // update the user's question data
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
  // send the test back regardless
  res.status(StatusCodes.OK).json({ test });
};

const getAllTestResults = async (req, res) => {
  const userId = req.user.userId;

  const prevTests = await Test.find(
    { user: userId, isResult: true },
    "_id category questions.isCorrect questions.isFlagged questions.question._id createdAt"
  );

  let prevTestArray = [];

  prevTests.map((test) => {
    let summaryResult = {
      category: test.category,
      correctAns: test.questions.reduce((acc, curr) => {
        if (curr.isCorrect) {
          acc = acc + 1;
        }
        return acc;
      }, 0),
      totalQuestions: test.questions.length,
      pass: false,
      date: moment(test.createdAt).format("MMM D, YYYY"),
      testId: test._id,
    };

    summaryResult.pass =
      summaryResult.correctAns / summaryResult.totalQuestions >= 0.875
        ? true
        : false;
    prevTestArray.push(summaryResult);
  });

  res.status(StatusCodes.OK).json({ prevTestArray });
};

export {
  getTest,
  deleteTest,
  updateTest,
  createTest,
  toggleFlagged,
  getAllTestResults,
  showStats,
};
