import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

export const BASE_URL = process.env.BASE_URL;

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_SECRET = process.env.JWT_SECRET || "";

export const PASSWORD_SALT = process.env.PASSWORD_SALT;

//? Google OAuth
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//? SMTP
export const AUTH_EMAIL = process.env.AUTH_EMAIL;
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

//? Gmail
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

export const SESSION_SECRET = process.env.SESSION_SECRET;

//? Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
