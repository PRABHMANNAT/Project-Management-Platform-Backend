import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "App",
      link: "https://app.com",
    },
  });

  const emailHtml = mailGenerator.generate(options.mailgenContent);
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAILTRAP_SMTP_USER,
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  });
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! We're excited to have you on board.",
      action: {
        instructions: "To verify your email please click on the following button",
        button: {
          color: "#e59e9e",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro: "Need help or have questions? Just reply to this email.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account.",
      action: {
        instructions: "To reset your password click on the following link",
        button: {
          color: "#84fb79",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro: "Need help or have questions? Just reply to this email.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
