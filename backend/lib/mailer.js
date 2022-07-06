const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
    Send templated emails using Sendgrid
*/
async function sendMail(toEmail, subject, dynamicTemplateData, templateId) {
  try {
    const msg = {
      to: toEmail,
      from: process.env.SENDGRID_FROM_EMAIL, // verified sender
      subject,
      templateId,
      dynamicTemplateData,
    };

    const response = await sgMail.send(msg);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to send email');
  }
}

module.exports = {
  sendMail,
};
