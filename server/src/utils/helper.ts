import bcrypt from "bcryptjs";
import { CustomError } from "../types";

/**
 * Formats the express-validator error message
 * @param {object} error - The error object
 * @returns {CustomError} - The formatted error object
 * @example
 * const errors = validationResult(req).formatWith(customErrorFormatter);
 * if (!errors.isEmpty()) {
 *   return next(new AppError("Invalid request data", 400, errors.array()));
 * }
 */
const customErrorFormatter = ({ path, msg }: any): CustomError => {
  return {
    field: path,
    message: msg,
  };
};

/**
 * Hashes the password using bcrypt
 * @param {string} password - The password to be hashed
 * @returns {Promise<string>} - The hashed password
 */
const hashPasswordHandler = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
};

export { customErrorFormatter, hashPasswordHandler };
