const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "paula.tf96@gmail.com",
    pass: "dmoz ljtb gdhb rkcq",
  },
});

module.exports = transport;
