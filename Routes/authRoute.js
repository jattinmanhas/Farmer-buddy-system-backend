import express from "express";
const router = express.Router();
import {registerController, loginController, meController}  from "../Controllers/authController.js";
import { isAdmin, protect } from "../Middlewares/authMiddleware.js";

//routing
//Register
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', protect, isAdmin, meController);

export default router;