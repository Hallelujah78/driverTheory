import { StatusCodes } from "http-status-codes";
import UserQuestionData from "../models/UserQuestionData.js";
import Question from "../models/Question.js";
import * as CustomError from "../errors/index.js";
import mongoose from "mongoose";
import moment from "moment";

const createUserQuestionData = async (req, res) => {
  const user = req.user.userId;
  let userQuestionData = await UserQuestionData.findOne({ user });
  if (userQuestionData) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "user question data already exists" });
  }
  const questionIds = await Question.find({}, { _id: 1 });
  console.log(questionIds);
  let questions = [];
  for (const id in questionIds) {
    let question = { question: questionIds[id]._id };
    questions.push(question);
    console.log(questions);
  }
  userQuestionData = await UserQuestionData.create({ user, questions });

  res.status(StatusCodes.CREATED).json({ userQuestionData });
};

// get all questionData
const getUserQuestionData = async (req, res) => {
  // all question data for specific user
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
  let result = UserQuestionData.find(queryObject);
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

  const questionData = await result;

  const totalUserQuestionData = await UserQuestionData.countDocuments(
    queryObject
  );

  res.status(StatusCodes.OK).json({
    questionData,
    totalUserQuestionData,
    numOfPages: Math.ceil(totalUserQuestionData / limit),
  });
};

// show stats
const showStats = async (req, res) => {
  let stats = await UserQuestionData.aggregate([
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
  let monthlyApplications = await UserQuestionData.aggregate([
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

const deleteUserQuestionData = async (req, res) => {
  const { id: questionDataId } = req.params;
  const questionData = await UserQuestionData.findOne({ _id: questionDataId });
  if (!questionData) {
    throw new CustomError.NotFoundError(
      `no questionData with id ${questionDataId}`
    );
  }
  // checkPermissions(req.user, questionData.createdBy);

  await UserQuestionData.deleteOne({ _id: questionDataId });

  res
    .status(StatusCodes.OK)
    .json({ msg: "questionData deleted successfully!" });
};

// update questionData

const updateUserQuestionData = async (req, res) => {
  const { id: questionDataId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const questionData = await UserQuestionData.findOne({ _id: questionDataId });

  if (!questionData) {
    throw new CustomError.NotFoundError(
      `questionData with id ${questionDataId} not found`
    );
  }

  // checkPermissions(req.user, questionData.createdBy);

  const updatedUserQuestionData = await UserQuestionData.findOneAndUpdate(
    { _id: questionDataId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedUserQuestionData });
};

const getTestUserQuestionData = async (req, res) => {
  const { testType } = req.body;
  // if (!testType) {
  //   throw new CustomError.BadRequestError("must provide test type");
  // }
  const testUserQuestionData = await UserQuestionData.find({});

  res.status(StatusCodes.OK).json({ testUserQuestionData });
};

export {
  getUserQuestionData,
  deleteUserQuestionData,
  updateUserQuestionData,
  createUserQuestionData,
};
