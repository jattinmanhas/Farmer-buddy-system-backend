import express from "express";
const router = express.Router();
import {registerController, loginController, meController}  from "../Controllers/authController.js";
import { protect } from "../Middlewares/authMiddleware.js";

//routing
//Register
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', protect, meController);

export default router;