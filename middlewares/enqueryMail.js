// const multer = require("multer");
// const sharp = require("sharp");
// const path = require("path");
// const fs = require("fs");
var nodemailer = require('nodemailer');
const enqueryPropertyMail =  async (req, res) => {
  const { name, email,phone, message } = req.body;

  try {
    // 1. Create transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // or use host, port for custom SMTP
    //   auth: {
    //     user: 'devakoode@gmail.com',
    //     pass: 'dqixhlddcbwsbgjx',
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,            // use SSL
      auth: {
        user: 'devakoode@gmail.com',
        pass: 'dqixhlddcbwsbgjx',
      },
      logger: true,            // log to console
      debug: true,             // include SMTP traffic in logs
    });

    // 2. Setup email data
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'eati@akoode.in', // Your business or support email
      subject: 'New Enquiry Form Submission',
      html: `
        <h3>New Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
    console.log('Enquiry sent successfully!' )

    res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });
  } catch (error) {
    console.error('Error sending enquiry email:', error);
    res.status(500).json({ success: false, message: 'Failed to send enquiry.' });
  }
 
};

const enqueryContactMail = async (req, res) => {
  console.log("📧 Enquiry mail triggered");

  const { name, email, phone, message, date } = req.body;
  console.log("Received Enquiry:", { name, email, phone, message, date });

  try {
    // 1. Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'devakoode@gmail.com',
        pass: 'dqixhlddcbwsbgjx',
      },
    });

    // 2. Prepare email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'eati@akoode.in',
      subject: 'New Enquiry Form Submission',
      html: `
        <h3>New Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Meeting Date:</strong> ${date}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ success: false, message: 'Failed to send enquiry. Please try again later.' });
  }
};


module.exports = { enqueryPropertyMail,enqueryContactMail};
