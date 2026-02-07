import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

/**
 * Send an email using Nodemailer via Gmail.
 * @param to - recipient email address
 * @param subject - email subject
 * @param text - email body as plain text
 * @param html - email body as html (optional)
 */
export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  if (!GMAIL_APP_PASSWORD || !GMAIL_USER) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variable"
    );
  }
  const mailOptions = {
    from: GMAIL_USER,
    to,
    subject,
    text,
    ...(html && { html }),
  };
  return transporter.sendMail(mailOptions);
};
