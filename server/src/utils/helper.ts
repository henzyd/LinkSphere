import { CustomError } from "../global";

const customErrorFormatter = ({ path, msg }: any): CustomError => {
  return {
    field: path,
    message: msg,
  };
};

export { customErrorFormatter };
