// needed to protect routes that require authentication
import jwt from "jsonwebtoken";
// needed to access User model to find user by ID
import { User } from "../models/user.model.js";
// needed to access environment variables like JWT_SECRET
import { ENV_VARS } from "../config/envVars.js";

// Middleware to protect routes by checking if the user is authenticated
export const protectRoute = async (req, res, next) => {
	try {
    // Check if the request has a JWT token in cookies
		const token = req.cookies["jwt-netflix"];

    // response error 401 = Unauthorized (if no token is found)
		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
		}

    // Verify the token using the secret key from environment variables
    // jwt.verify() decodes the token and checks its validity
    // if the token is valid, it returns the decoded payload
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    // if token is invalid or expired
		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}

    // Find the user by ID from the decoded token
    // decoded.userId is the ID of the user stored in the token when it was created
		const user = await User.findById(decoded.userId).select("-password");

    // If user is not found, return a 404 error
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

    // Attach the user object to the request for use in subsequent middleware or route handlers
    // This allows access to user information in the route handlers without querying the database again
		req.user = user;

    // Call the next middleware or route handler in the stack (return to the original request)
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};