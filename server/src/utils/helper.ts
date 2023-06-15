import bcrypt from "bcryptjs";
import { CustomError } from "../global";

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
