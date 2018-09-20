import nodemailer from 'nodemailer';

const sendEmail = async (recipient, url, linkText) => {
  nodemailer.createTestAccount((err1) => {
    if (err1) {
      console.log(err1);
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const message = {
      from: 'TiknaTech <abc@xyz.com>',
      to: `Recipient <${recipient}>`,
      subject: 'Confirmation Email',
      text: 'Please confirm email.',
      html: `<html>
        <body>
        <p>Thank you for registering. Please click on the link below to confirm your email.</p>
        <a href='${url}'>${linkText}</a>
        </body>
        </html>`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
};

export default sendEmail;
