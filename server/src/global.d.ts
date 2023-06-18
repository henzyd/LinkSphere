declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      PORT: string;
      JWT_SECRET: string;
      PASSWORD_SALT: string;
      AUTH_EMAIL: string;
      EMAIL_HOST: string;
      EMAIL_PORT: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      GMAIL_EMAIL: string;
      GMAIL_PASSWORD: string;
    }
  }
}

export interface CustomError {
  field: string;
  message: string;
}
export {};
