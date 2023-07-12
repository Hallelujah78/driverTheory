import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  getQuestionsRead,
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  showStats,
  getTestQuestions,
} from "../controllers/questionController.js";

const router = express.Router();
router.route("/test").get(authenticateUser, getTestQuestions);
router
  .route("/")
  .get(authenticateUser, getAllQuestions)
  .post(authenticateUser, testUser, createQuestion);
router.route("/stats").get(authenticateUser, showStats);

router
  .route("/:id")
  .delete(authenticateUser, testUser, deleteQuestion)
  .patch(authenticateUser, testUser, updateQuestion);

router.route("/read/:category").get(authenticateUser, getQuestionsRead);
export default router;
