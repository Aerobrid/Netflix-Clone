import express from "express";
// always have to include the file extension .js when importing files since type is set to "module" in package.json
// import the functions for handling authentication routes from the controller
import { login, logout, signup, authCheck } from "../controllers/auth.controller.js";
// import the middleware for protecting routes
import { protectRoute } from "../middleware/protectRoute.js";

// new instance of Express Router 
const router = express.Router();

// when a request is made to specific endpoints, the corresponding controller function is called
// the functions imported are defined in the auth.controller.js file
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);

// export the router so that it can be used in the server.js file
export default router;
