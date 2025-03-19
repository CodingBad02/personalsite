import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting middleware
const applyMiddleware = (middleware) => async (req, res) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Apply rate limiting
    await applyMiddleware(limiter)(req, res);
  } catch (error) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  const { name, email, subject, message, captchaToken } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  if (!captchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA verification failed' });
  }

  try {
    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: 'POST' }
    );
    
    const recaptchaData = await recaptchaResponse.json();
    
    if (!recaptchaData.success) {
      return res.status(400).json({ 
        message: 'reCAPTCHA verification failed',
        errors: recaptchaData['error-codes']
      });
    }
    
    // Simple honeypot check (frontend should never fill this field)
    if (req.body._gotcha) {
      // Silently return success but don't send email
      return res.status(200).json({ message: 'Form submitted successfully' });
    }
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Website Contact: ${subject}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
} 