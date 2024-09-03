import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()


const host = process.env.G_HOST ?? 'smtp.gmail.com';
const port = parseInt(process.env.G_PORT ?? '587', 10); // Default port for SMTP
const user = process.env.USER ?? 'eniolaolagbegi@gmail.com';
const pass = process.env.PASSWORD ?? 'default_password';

export const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // True for 465, false for other ports
    auth: {
        user,
        pass,
    },
});
