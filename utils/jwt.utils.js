import jwt from "jsonwebtoken";
function generateJWTToken(sessionId) {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
}

export default generateJWTToken;
