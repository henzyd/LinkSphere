import jwt from "jsonwebtoken";

/**
 * @param {String} id
 * @description Sign an access token
 */
function signAccessToken(id: string) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.NODE_ENV === "production" ? "5m" : "1d",
  });
}

/**
 * @param {String} id
 * @description Sign an refresh token
 */
function signRefreshToken(id: string) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    expiresIn: "14d",
  });
}

export { signAccessToken, signRefreshToken };
