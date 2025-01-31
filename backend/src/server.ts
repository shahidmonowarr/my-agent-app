import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import router from './routes/taskRoutes';
import Task from './models/Task';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || '';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api', router);

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Scheduler to check for pending tasks every minute
  cron.schedule('* * * * *', async () => {
    try {
      const tasks = await Task.find({ status: 'pending' });
      tasks.forEach(async (task) => {
        // Send an email (example automation)
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'recipient@example.com',
          subject: `Task: ${task.title}`,
          text: task.description,
        };
  
        await transporter.sendMail(mailOptions);
        console.log(`Email sent for task: ${task.title}`);
  
        // Update task status to completed
        task.status = 'completed';
        await task.save();
      });
    } catch (err) {
      console.log(err);
    }
  });

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));