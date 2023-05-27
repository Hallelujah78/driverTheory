import { StatusCodes } from "http-status-codes";
import Empty from "../models/Empty.js";
import * as CustomError from "../errors/index.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import moment from "moment";

const createEmpty = async (req, res) => {
  // company, position, status, type, location, createdBy
  const { company, position } = req.body;
  if (!company || !position) {
    throw new CustomError.BadRequestError(
      "please provide company and position"
    );
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.NotFoundError("user not found");
  }
  const empty = await Empty.create({
    company,
    position,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ empty });
};

const getAllEmptys = async (req, res) => {
  // all emptys for specific user
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
  let result = Empty.find(queryObject);
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

  const emptys = await result;

  const totalEmptys = await Empty.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({
    emptys,
    totalEmptys,
    numOfPages: Math.ceil(totalEmptys / limit),
  });
};
const showStats = async (req, res) => {
  let stats = await Empty.aggregate([
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
  let monthlyApplications = await Empty.aggregate([
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

const deleteEmpty = async (req, res) => {
  const { id: emptyId } = req.params;
  const empty = await Empty.findOne({ _id: emptyId });
  if (!empty) {
    throw new CustomError.NotFoundError(`no empty with id ${emptyId}`);
  }
  // checkPermissions(req.user, empty.createdBy);

  await Empty.deleteOne({ _id: emptyId });

  res.status(StatusCodes.OK).json({ msg: "empty deleted successfully!" });
};

const updateEmpty = async (req, res) => {
  const { id: emptyId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const empty = await Empty.findOne({ _id: emptyId });

  if (!empty) {
    throw new CustomError.NotFoundError(`empty with id ${emptyId} not found`);
  }

  // checkPermissions(req.user, empty.createdBy);

  const updatedEmpty = await Empty.findOneAndUpdate(
    { _id: emptyId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmpty });
};

export { getAllEmptys, showStats, deleteEmpty, updateEmpty, createEmpty };
