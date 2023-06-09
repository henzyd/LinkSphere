import jwt from "jsonwebtoken";

/**
 * @param {String} id
 * @description Sign an access token
 */
function signAccessToken(id: string) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.NODE_ENV === "production" ? "3m" : "1d", // 1 day changed to 3 minute for production
  });
}

/**
 * @param {String} id
 * @description Sign an refresh token
 */
function signRefreshToken(id: string) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

export { signAccessToken, signRefreshToken };
