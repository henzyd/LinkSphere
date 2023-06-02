declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      PORT: string;
      // JWT_SECRET_KEY: string;
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
