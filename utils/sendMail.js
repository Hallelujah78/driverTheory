import nodemailer from "nodemailer";
import nodeMailerConfig from "./nodeMailerConfig.js";

const sendMail = async ({ to, subject, html, text }) => {
  const transporter = nodemailer.createTransport(nodeMailerConfig);
  const message = {
    from: "Verna <verna.vonrueden15@ethereal.email>",
    to,
    subject,
    html,
    text,
  };
  return transporter.sendMail(message);
};

export default sendMail;
