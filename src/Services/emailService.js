import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "jsnitinbela54@gmail.com",
    pass: "uwmvoydefditcwub",
  },
});

export const sendEmail = async (recepient, subject, emailTemplate)=> {
  try {
  const info = await transporter.sendMail({
    from: '"Blog Your Way Team"', // sender address
    to: recepient, // list of recipients
    subject: subject, // subject line
    html: emailTemplate, // HTML body
  });

  console.log("Message sent: %s", info.messageId);

} catch (err) {
  console.error("Error while sending mail:", err.message);
}

}
sendEmail()



