import nodemailer, { Transporter as nodemailerTransporter } from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";

let transporter: nodemailerTransporter;
if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
} else {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    // secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

transporter.verify((error, success) => {
  if (error) {
    console.log("Error: ", error);
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

async function sendWelcomeMail(
  email: string,
  data: {
    name: string;
    email: string;
  }
) {
  const mailOptions = {
    from: `${
      process.env.NODE_ENV === "production"
        ? process.env.GMAIL_EMAIL
        : process.env.EMAIL_USERNAME
    }`,
    to: email,
    subject: "Welcome to LinkSphere - Let's Connect and Get Creative!",
    template: "welcome",
    context: {
      name: data.name,
      email: data.email,
    },
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
}

export { sendWelcomeMail };
