declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_STRING: string;
      PORT: number;
      JWT_SECRET_KEY: string;
      JWT_EXPIRE_IN: string;
      ADMIN_HASH_ROUTE: string;
    }
  }
}

export {};
