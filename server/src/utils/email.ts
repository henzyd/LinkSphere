import nodemailer, { Transporter as nodemailerTransporter } from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
import {
  AUTH_EMAIL,
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USERNAME,
  GMAIL_EMAIL,
  GMAIL_PASSWORD,
  NODE_ENV,
} from "../env";

let transporter: nodemailerTransporter;
if (NODE_ENV === "production") {
  transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_PASSWORD,
    },
  });
} else {
  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: false,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });
}

transporter.verify((error, success) => {
  if (error) {
    console.error("Error: ", error);
    throw error;
  }
});

const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    defaultLayout: "", //! research this option
    extname: ".hbs",
    partialsDir: path.resolve(__dirname, "..", "templates/email"),
  },
  viewPath: path.resolve(__dirname, "..", "templates/email"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));

const mailOptions = {
  from: `${NODE_ENV === "production" ? GMAIL_EMAIL : AUTH_EMAIL}`,
  to: "",
  subject: "",
  template: "",
  context: {},
};

async function sendWelcomeMail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  mailOptions.to = email;
  mailOptions.subject =
    "Welcome to LinkSphere - Let's Connect and Get Creative!";
  mailOptions.template = "welcome";
  mailOptions.context = {
    name,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
}

async function sendPasswordResetMail(email: string, url: string) {
  mailOptions.to = email;
  mailOptions.subject = "LinkSphere - Password Reset";
  mailOptions.template = "resetPassword";
  mailOptions.context = {
    url,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
}

async function sendOtpMail({
  name,
  email,
  code,
}: {
  name: string;
  code: number;
  email: string;
}) {
  mailOptions.to = email;
  mailOptions.subject = "LinkSphere - Verify Your Account";
  mailOptions.template = "otp";
  mailOptions.context = {
    name,
    code,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
}

export { sendWelcomeMail, sendPasswordResetMail, sendOtpMail };
