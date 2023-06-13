import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Token from "../models/Token.js";
import * as CustomError from "../errors/index.js";
import {
  createTokenUser,
  attachCookie,
  attachCookiesToResponse,
  sendResetPasswordEmailSG,
  sendVerificationEmailSG,
} from "../utils/index.js";
import crypto from "crypto";

const origin = "http://localhost:3000";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("please provide both values");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("please verify your email");
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("invalid credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  // no existing token
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomError.BadRequestError(
      "bad request, please provide all values"
    );
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomError.BadRequestError("user already exists");
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({ name, email, password, verificationToken });

  await sendVerificationEmailSG({ user, origin });

  res.status(StatusCodes.CREATED).json({
    msg: "Success! please check your email and verify your account",
  });
};

const logoutUserOld = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

const logoutUser = async (req, res) => {
  await Token.findOneAndDelete({
    user: req.user.userId,
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
  const token = user.createJWT();
  const tokenUser = createTokenUser(user);
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({ user: tokenUser, location: user.location });
};

const getCurrentUser = async (req, res) => {
  console.log(req.user.userId);
  const user = await User.findOne({ _id: req.user.userId });
  const tokenUser = createTokenUser(user);
  res.status(StatusCodes.OK).json({ user: tokenUser, location: user.location });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });
  // user doesn't exist
  if (!user) {
    throw new CustomError.UnauthenticatedError(
      "Verification failed, redirecting..."
    );
  }

  const tokenUser = createTokenUser(user);

  // tokens match and user is not verified
  if (user.verificationToken === verificationToken && !user.isVerified) {
    user.isVerified = true;
    user.verificationToken = "";
    user.verificationDate = new Date(Date.now());
    await user.save();
    return res.status(StatusCodes.OK).json({
      msg: "account verified",
      user: tokenUser,
      location: user.location,
    });
  }
  // tokens don't match
  if (user.verificationToken !== verificationToken) {
    // but user is verified already
    if (user.isVerified) {
      return res.status(StatusCodes.OK).json({
        msg: "You have already verified your account!",
        user: tokenUser,
        location: user.location,
      });
    } else {
      throw new CustomError.UnauthenticatedError(
        "Verification failed, redirecting..."
      );
    }
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("please provide an email address");
  }
  if (email === "testuser@test.com") {
    throw new CustomError.BadRequestError("Test User - Read-only!");
  }
  const user = await User.findOne({ email });
  if (user) {
    user.passwordToken = crypto.randomBytes(70).toString("hex");
    user.passwordTokenExpirationDate = new Date(Date.now() + 60 * 1000 * 10);
    await user.save();

    sendResetPasswordEmailSG({
      email,
      passwordToken: user.passwordToken,
      origin,
      name: user.name,
    });
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Please check your email to reset your password" });
};

const resetPassword = async (req, res) => {
  const { confirmPassword, email, passwordToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  if (passwordToken !== user.passwordToken) {
    throw new CustomError.UnauthenticatedError(
      "Something went wrong. Try logging in with your new password or resetting your password again. Redirecting..."
    );
  }
  if (user.passwordTokenExpirationDate < new Date(Date.now())) {
    throw new CustomError.UnauthenticatedError(
      "Your reset password link has expired. Please use the 'forgot password' option again. Redirecting..."
    );
  }
  user.password = confirmPassword;
  user.passwordToken = "";
  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Password has been reset. Redirecting..." });
};

export {
  login,
  register,
  logoutUser,
  verifyEmail,
  updateUser,
  getCurrentUser,
  resetPassword,
  forgotPassword,
};
