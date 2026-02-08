import express from "express"
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from "../controller/auth.controller.js";
import { verifytoken } from "../middlewear/verifyToken.js";

const router = express.Router()
router.post("/signup",signup)
router.post("/login",login)
router.get("/check-auth",verifytoken,checkAuth)
router.post("/logout",logout)
router.post("/forgot-pass",forgotPassword)
router.post("/reset-password/:token",resetPassword)
router.post("/verify-email",verifyEmail)

export default router;