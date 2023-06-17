import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  createTestResults,
  getSingleTestResult,
  getTestResults,
} from "../controllers/resultController.js";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, getTestResults)
  .post(authenticateUser, createTestResults);

router.route("/:id").get(authenticateUser, getSingleTestResult);

export default router;
