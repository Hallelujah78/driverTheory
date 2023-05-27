import {
  login,
  register,
  updateUser,
  logoutUser,
  getCurrentUser,
  verifyEmail,
  resetPassword,
  forgotPassword,
} from "../controllers/authController.js";
import express from "express";
import testUser from "../middleware/testUser.js";
import { authenticateUser } from "../middleware/auth.js";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 1000 * 60,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minute",
});

const router = express.Router();

router.route("/login").post(apiLimiter, login);
router.route("/register").post(apiLimiter, register);

router.route("/updateUser").patch(authenticateUser, testUser, updateUser);

router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/logoutUser").delete(authenticateUser, logoutUser);
router.route("/verify-email").post(verifyEmail);
router.route("/reset-password").post(apiLimiter, resetPassword);
router.route("/forgot-password").post(apiLimiter, forgotPassword);

export default router;
