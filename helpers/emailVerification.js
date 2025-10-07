const nodemailer = require("nodemailer");
async function emailVerification(email, otp) {
    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kazimayzid208@gmail.com",
    pass: "gratwsghynlzkhnh",
  },
});

 const info = await transporter.sendMail({
    from: 'kazimayzid208@gmail.com',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", 
    html: `<p>this your otp: <b>${otp}</b></p>`,
  });
}
module.exports = emailVerification