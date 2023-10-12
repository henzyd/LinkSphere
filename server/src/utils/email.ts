import nodemailer, { Transporter as nodemailerTransporter } from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";

let transporter: nodemailerTransporter;
if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
} else {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

transporter.verify((error, success) => {
  if (error) {
    console.log("Error: ", error);
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
  from: `${
    process.env.NODE_ENV === "production"
      ? process.env.GMAIL_EMAIL
      : process.env.AUTH_EMAIL
  }`,
  to: "",
  subject: "",
  template: "",
  context: {},
};

async function sendWelcomeMail(
  email: string,
  data: {
    name: string;
    email: string;
  }
) {
  mailOptions.to = email;
  mailOptions.subject =
    "Welcome to LinkSphere - Let's Connect and Get Creative!";
  mailOptions.template = "welcome";
  mailOptions.context = {
    name: data.name,
    email: data.email,
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
  console.log("Email sent:", info.messageId, info);
}

export { sendWelcomeMail, sendPasswordResetMail };
