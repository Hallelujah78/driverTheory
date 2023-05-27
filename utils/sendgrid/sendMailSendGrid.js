import sgMail from "@sendgrid/mail";

const sendMailSendGrid = async ({ to, subject, html, text }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
    text,
  };
  return sgMail
    .send(msg)
    .then(() => {
      console.log("email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendMailSendGrid;
