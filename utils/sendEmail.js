const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const sendMail = asyncHandler(async (email, subject, link) => {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			}
		});
		await transporter.sendMail({
			from: `Projectly ${process.env.MAIL_USER}`,
			to: email,
			subject: subject,
			html: `<a href = ${link}>Click here</a>`
		});
		console.log("email sent successfully");
});
module.exports = sendMail;