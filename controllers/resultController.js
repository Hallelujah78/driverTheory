import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";
import Test from "../models/Test.js";
import * as CustomError from "../errors/index.js";
import mongoose from "mongoose";
import moment from "moment";

const createTestResults = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "create test results" });
};

const getSingleTestResult = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get single test result" });
};

const getTestResults = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get test results" });
};

export { createTestResults, getSingleTestResult, getTestResults };
