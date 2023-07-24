import sendMail from "./sendMail.js";
import verifyMessage from "./verifyMessage.js";

const sendVerificationEmail = async ({ user, origin }) => {
  const { email, name, verificationToken } = user;

  const verifyEmailLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const text = `Verify your email to finish signing up\n\n${name}, thank you for choosing DriveL.\n\nPlease confirm your email address using the link below:\n\n${verifyEmailLink}\n\nYou are receiving this email because you have registered with our site. Make sure our messages get to your inbox (and not your bulk or junk folders).\nPrivacy Policy: ${origin}`;

  const message = verifyMessage({ name, origin, verifyEmailLink });

  return sendMail({ to: email, subject: "Email Verification", html: message });
};

export default sendVerificationEmail;
