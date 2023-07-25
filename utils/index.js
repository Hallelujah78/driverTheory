import checkPermissions from "./checkPermissions.js";
import createTokenUser from "./createTokenUser.js";

import sendMail from "./sendMail.js";
import sendVerificationEmail from "./sendVerificationEmail.js";
import sendResetPasswordEmail from "./sendResetPasswordEmail.js";
import { attachCookiesToResponse, createJWT, isTokenValid } from "./jwt.js";
import attachCookie from "./attachCookie.js";
import sendVerificationEmailSG from "./sendgrid/sendVerificationEmailSG.js";
import sendResetPasswordEmailSG from "./sendgrid/sendResetPasswordEmailSG.js";
import shuffleArray from "./shuffleArray.js";
import createResults from "./createResults.js";
import { createUserQuestionData } from "./userQuestionData.js";
import getNumFlaggedQuestions from "./getFlaggedQuestions.js";
import getNumIncorrectQuestions from "./getIncorrectQuestions.js";
import getNumLeastSeenQuestions from "./getNumLeastSeenQuestions.js";
import capitalize from "./capitalize.js";

export {
  sendVerificationEmailSG,
  sendResetPasswordEmailSG,
  attachCookie,
  createJWT,
  isTokenValid,
  createTokenUser,
  checkPermissions,
  sendMail,
  sendVerificationEmail,
  sendResetPasswordEmail,
  attachCookiesToResponse,
  shuffleArray,
  createResults,
  createUserQuestionData,
  getNumFlaggedQuestions,
  getNumIncorrectQuestions,
  getNumLeastSeenQuestions,
  capitalize,
};
