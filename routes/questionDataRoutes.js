import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  getUserQuestionData,
  deleteUserQuestionData,
  updateUserQuestionData,
  createUserQuestionData,
} from "../controllers/questionDataController.js";

const router = express.Router();
router.route("/").post(authenticateUser, createUserQuestionData);

export default router;
