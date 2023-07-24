import sendMail from "./sendMail.js";
import resetPasswordMessage from "./resetPasswordMessage.js";

const sendResetPasswordEmail = async ({
  email,
  passwordToken,
  origin,
  name,
}) => {
  const resetPasswordLink = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;

  const text = `RESET PASSWORD\n${name},\nYou are receiving this message because you requested that your password be reset.\n\nYou can reset your password using the link below:\n${resetPasswordLink}\n\nRegards,\nThe DriveL Team\n\nYou are receiving this email because you have registered with our site. Make sure our messages get to your inbox (and not your bulk or junk folders).\nPrivacy Policy: ${origin}`;

  const message = resetPasswordMessage({ origin, resetPasswordLink, name });

  return sendMail({
    to: email,
    subject: "Reset Password",
    html: message,
    text,
  });
};

export default sendResetPasswordEmail;
