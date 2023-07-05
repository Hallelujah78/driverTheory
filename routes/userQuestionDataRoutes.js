import express from "express";
import { authenticateUser } from "../middleware/auth.js";

import { getOverviewResults } from "../controllers/userQuestionDataController.js";

const router = express.Router();
router.route("/overview").get(authenticateUser, getOverviewResults);

export default router;
