declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      CLIENT_BASE_URL: string;
      BASE_URL: string;

      DATABASE_URL: string;
      JWT_SECRET: string;
      PASSWORD_SALT: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      AUTH_EMAIL: string;
      EMAIL_HOST: string;
      EMAIL_PORT: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;

      GMAIL_EMAIL: string;
      GMAIL_PASSWORD: string;

      SESSION_SECRET: string;
    }
  }
}
