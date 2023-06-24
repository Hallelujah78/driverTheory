import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  deleteUserQuestionData,
  createUserQuestionData,
  toggleIsFlaggedStatus,
} from "../controllers/userQuestionDataController.js";

const router = express.Router();
router.route("/").patch(authenticateUser, toggleIsFlaggedStatus);
router.route("/").post(authenticateUser, createUserQuestionData);

export default router;
