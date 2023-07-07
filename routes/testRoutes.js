import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  deleteTest,
  updateTest,
  createTest,
  getTest,
  toggleFlagged,
  getAllTestResults,
} from "../controllers/testController.js";

const router = express.Router();
router
  .route("/")
  .get(authenticateUser, getTest)
  .post(authenticateUser, createTest)
  .delete(authenticateUser, deleteTest)
  .patch(authenticateUser, updateTest);
router.route("/flagged").patch(authenticateUser, toggleFlagged);
router.route("/prev-results").get(authenticateUser, getAllTestResults);

export default router;
