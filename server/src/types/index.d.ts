import type { User, UserProfile } from "@prisma/client";
import type { Request } from "express";

declare global {
  interface CustomError {
    field: string;
    message: string;
  }

  /**
   * Custom interface to include the _currentUser property in the Request object.
   * Extends the base Request interface from Express.
   */
  type AuthenticatedRequest = Request & {
    _currentUser?: User & {
      profile: UserProfile | null;
    };
  };
}
