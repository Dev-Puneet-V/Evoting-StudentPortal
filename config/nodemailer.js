const nodemailer = require("nodemailer");

// create a transport object using Gmail's SMTP server
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use SSL
	auth: {
	  user: process.env.EMAIL,
	  pass: process.env.EMAIL_PASS
	}
});
module.exports = {
	transporter : transporter
}