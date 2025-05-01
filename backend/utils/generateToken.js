// jwt function generates a JWT (JSON web token) for user authentication and sets it as a cookie in the response
import jwt from "jsonwebtoken"
// for environment variables like JWT secret, port number, etc.
import { ENV_VARS } from "../config/envVars.js"

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
  
  // Set the token in a cookie
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,               // Cookie expiration time (15 days in milliseconds)
    httpOnly: true,                                 // Prevents client-side JavaScript from accessing the cookie (helps mitigate XSS attacks: cross-site scripting)
    secure: ENV_VARS.NODE_ENV !== "development",    // Use secure cookies in production
    sameSite: "strict"                              // Helps prevent CSRF attacks: cross-site request forgery
  });
  
  // return the generated token for further use if needed
  // useful for debugging or logging purposes
  return token;
};
  