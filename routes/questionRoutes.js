import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  getQuestionsRead,
  createQuestion,
  getTestQuestions,
  getCategoryLength,
  getOtherPractice,
} from "../controllers/questionController.js";

const router = express.Router();
router.route("/test").get(authenticateUser, getTestQuestions);
router.route("/").post(authenticateUser, testUser, createQuestion);

router.route("/practice/other").post(authenticateUser, getOtherPractice);
router.route("/read/:category").get(authenticateUser, getQuestionsRead);

router.route("/practice/:category").get(authenticateUser, getCategoryLength);

export default router;
