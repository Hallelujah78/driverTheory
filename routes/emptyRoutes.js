import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  getAllEmptys,
  deleteEmpty,
  updateEmpty,
  createEmpty,
  showStats,
} from "../controllers/emptyController.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, getAllEmptys)
  .post(authenticateUser, testUser, createEmpty);
router.route("/stats").get(authenticateUser, showStats);
router
  .route("/:id")
  .delete(authenticateUser, testUser, deleteEmpty)
  .patch(authenticateUser, testUser, updateEmpty);

export default router;
