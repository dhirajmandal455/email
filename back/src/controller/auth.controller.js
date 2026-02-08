import User from "../model/auth.model.js";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { genrateVerificationToken } from "../utils/genrateVerificationToken.js";
import { genrateToken } from "../utils/genrateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendWelcomeEmail } from "../mailtrap/mailTrap.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({ msg: "Fill all feilds" })
        }

        const exitsUser = await User.findOne({ email })
        if (exitsUser) {
            return res.status(400).json({ msg: "User allready exits" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        const verificationtoken = genrateVerificationToken()

        const user = await User.create({
            name, email, password: hashPass, verificationtoken, verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        genrateToken(user._id, res)
        await sendVerificationEmail(user.email, verificationtoken)

        // await user.save()

        res.status(201).json({
            msg: "Signup successfull", user: {
                ...user._doc, password: undefined
            }
        })

    } catch (error) {
        console.log("Err in signup", error)
        res.status(500).json({ msg: "internal server error" })
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationtoken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Invalid verification code",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                msg: "Email already verified",
            });
        }

        if (user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({
                success: false,
                msg: "Verification code expired",
            });
        }


        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save()

        try {
            await sendWelcomeEmail(user.email, user.name);
        } catch (err) {
            console.log("Welcome email failed:", err.message);
        }

        res.status(200).json({
            success: true,
            msg: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Err in Verify email", error)
        res.status(500).json({ msg: "internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({ msg: "invalid credientials" })
        }
        await bcrypt.compare(password, user.password);
        genrateToken(user._id, res);


        user.lastLogin = new Date();
        await user.save()


        res.status(200).json({
            msg: "login successfull", success: true, user: {
                ...user._doc,
                password: undefined
            },
        })

    } catch (error) {
        console.log("Err in login", error)
        res.status(500).json({ msg: "internal server error" })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: "USer not found" })
        }
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 2 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        return res.status(200).json({
            success: true,
            msg: "Password reset link sent to email",
        });


    } catch (error) {
        console.log("Error in forgotEmail controller", error.message)
        res.status(500).json({ msg: "Internal server error", error: error.message })
    }

}

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.json({ msg: "Logut successfull" })
}

export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expire reset token" })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        user.password = hashPassword;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpiresAt=undefined;


        await user.save()

        await sendResetSuccessEmail(user.email);


        res.status(200).json({ success: true, msg: "password reset successfull" })


    } catch (error) {
        console.log("err in reset-password", error)
        res.status(500).json({ success: false, msg: "Internal server error" })
    }
}

export const checkAuth =async (req,res) => {
    try {
        const user = await  User.findById(req.userId).select("-password")
        if(!user){
            return res.status(404).json({success:false,msg:"Uer not found"})
        }
        res.status(200).json({success:true,user})
    } catch (error) {
        console.log("Err in checkAuth ",error)
            return res.status(500).json({success:false,msg:"Internal server error"})

    }
    
}