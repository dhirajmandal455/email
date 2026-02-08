import { MailtrapClient } from "mailtrap"
import dotenv from "dotenv"
import { RESET_PASSWORD_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

dotenv.config()

export const mailtrapClient = new MailtrapClient({ endpoint: process.env.MAILTRAP_TOKEN, token: process.env.MAILTRAP_TOKEN });

export const sender = { email: "hello@demomailtrap.co", name: "You" };
const recipients = [
  {
    email: "you434484@gmail.com",
  }
];


export const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }]
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "5e32143d-6b2e-4366-b37b-af1fa92269db",
      template_variables: {
        "name": name,
        "company_info_name": "Devekloper world"
      }
    });

    console.log("Wleome email sent successfully", response)



  } catch (error) {
    console.error("error im sent welcome email", error);
    throw new Error(`ERror sending email: ${error}`)
  }

}


export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Reset Your Password",
      html: RESET_PASSWORD_EMAIL_TEMPLATE(resetUrl),
      category: "Password reset",
    })
  } catch (error) {
    console.error("Password reset email failed:", error);
    throw new Error("Unable to send password reset email");
  }

}


export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "PAssword reset sucessfull",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE(),
      category: "Password reset",
    })
    console.log("Password reset successful", response)
  } catch (error) {
    console.log("Error sending reset-password success email", error)
    throw new Error(`Error in sending password reset email : ${error}`)
  }
}