import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL as string;

export const BASE_URL = process.env.BASE_URL as string;

export const DATABASE_URL = process.env.DATABASE_URL as string;

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const PASSWORD_SALT = process.env.PASSWORD_SALT as string;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const AUTH_EMAIL = process.env.AUTH_EMAIL as string;

export const EMAIL_HOST = process.env.EMAIL_HOST as string;

export const EMAIL_PORT = process.env.EMAIL_PORT as string;

export const EMAIL_USERNAME = process.env.EMAIL_USERNAME as string;

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;

export const GMAIL_EMAIL = process.env.GMAIL_EMAIL as string;

export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD as string;

export const SESSION_SECRET = process.env.SESSION_SECRET as string;
