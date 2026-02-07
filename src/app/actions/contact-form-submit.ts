"use server";

import { sendMail } from "@/lib/mail-service";
import { eMail } from "@/config/constants";

/**
 * Action to handle contact form submission and send an email.
 * @param values - The form data containing name, email, message
 */
export const contactFormSubmit = async (values: {
  name: string;
  email: string;
  message: string;
}) => {
  const { name, email, message } = values;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    await sendMail({
      to: eMail,
      subject: `Portfolio Contact Form Submission from ${name}`,
      text: `You've received a new message from your portfolio contact form:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: (error as Error).message || "Failed to send message.",
    };
  }
};
