const nodemailer = require("nodemailer");

const sendMail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "87a8efbd11d1ff",
      pass: "0b580402bab29b",
    },
  });

  const mailOptions = {
    from: "sunil@gmail.com", // sender address
    to: option.email, // list of receivers
    subject: option.subject, // Subject line
    text: option.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendMail;
