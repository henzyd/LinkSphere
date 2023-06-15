declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      PORT: string;
      JWT_SECRET: string;
      PASSWORD_SALT: string;
      // JWT_EXPIRE_IN: string;
      // ADMIN_HASH_ROUTE: string;
    }
  }
}

export interface CustomError {
  field: string;
  message: string;
}
export {};
