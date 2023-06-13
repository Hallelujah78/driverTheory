import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  deleteTest,
  updateTest,
  createTest,
  getTest,
} from "../controllers/testController.js";

const router = express.Router();
router
  .route("/")
  .get(authenticateUser, getTest)
  .post(authenticateUser, createTest)
  .delete(authenticateUser, deleteTest)
  .patch(authenticateUser, updateTest);

export default router;
