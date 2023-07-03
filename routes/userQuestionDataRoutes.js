import express from "express";
import { authenticateUser } from "../middleware/auth.js";

import { toggleIsFlaggedStatus } from "../controllers/userQuestionDataController.js";

const router = express.Router();
router.route("/").patch(authenticateUser, toggleIsFlaggedStatus);

export default router;
