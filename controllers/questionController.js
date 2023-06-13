import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";
import * as CustomError from "../errors/index.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import moment from "moment";

const createQuestion = async (req, res) => {
  // company, position, status, type, location, createdBy
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
    questionCategory,
  });
  res.status(StatusCodes.CREATED).json({ question });
};

// get all questions
const getAllQuestions = async (req, res) => {
  // all questions for specific user
  const { userId } = req.user;
  const { status, type, search, sort } = req.query;
  const queryObject = {
    createdBy: userId,
  };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (type && type !== "all") {
    queryObject.type = type;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let result = Question.find(queryObject);
  // chain sort conditions here:
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const questions = await result;

  const totalQuestions = await Question.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({
    questions,
    totalQuestions,
    numOfPages: Math.ceil(totalQuestions / limit),
  });
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

const deleteQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const question = await Question.findOne({ _id: questionId });
  if (!question) {
    throw new CustomError.NotFoundError(`no question with id ${questionId}`);
  }
  // checkPermissions(req.user, question.createdBy);

  await Question.deleteOne({ _id: questionId });

  res.status(StatusCodes.OK).json({ msg: "question deleted successfully!" });
};

// update question

const updateQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const question = await Question.findOne({ _id: questionId });

  if (!question) {
    throw new CustomError.NotFoundError(
      `question with id ${questionId} not found`
    );
  }

  // checkPermissions(req.user, question.createdBy);

  const updatedQuestion = await Question.findOneAndUpdate(
    { _id: questionId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedQuestion });
};

const getTestQuestions = async (req, res) => {
  const { testType } = req.body;
  // if (!testType) {
  //   throw new CustomError.BadRequestError("must provide test type");
  // }
  const testQuestions = await Question.find({});

  res.status(StatusCodes.OK).json({ testQuestions });
};

export {
  getTestQuestions,
  getAllQuestions,
  showStats,
  deleteQuestion,
  updateQuestion,
  createQuestion,
};
