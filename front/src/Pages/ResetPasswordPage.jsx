import React, { useState } from "react";
import {motion } from "framer-motion"
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import {toast } from "react-hot-toast"

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const { resetPassword, isLoading, error, message } = useAuthStore();

  const {token} = useParams();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      alert("Password donot match")
      return
    }
   try {
     await resetPassword(token,password)
     toast.success("Password reset successful, redirecting to login page...")
     setTimeout(() => {
       navigate("/login")
     }, 2000);
     
   } catch (error) {
    console.log(error.message,"Error in reseting password ")
    toast.error(error.message || "Error reseting password")
   }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-gray-800 backdrop-blur-lg shadow-xl mt-20 overflow-hidden rounded-lg p-2">
      <h1 className="text-3xl font-bold bg-linear-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text text-center p-2">
        ResetPassword
      </h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex items-center gap-2 pl-3 rounded-lg bg-gray-950 border border-green-900/40 mb-2">
          <Lock size={21} className="text-green-400" />
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            className="w-full bg-transparent py-3 px-2 text-sm text-gray-300  outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 pl-3 rounded-lg bg-gray-950 border border-green-900/40 mb-2">
          <Lock size={21} className="text-green-400" />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            className="w-full bg-transparent py-3 px-2 text-sm text-gray-300  outline-none"
            onChange={(e) => setConfirmPasword(e.target.value)}
          />
        </div>
        {/*  */}
        <motion.button
                  className="text-center text-2xl font-bold px-5 py-2 bg-linear-to-r from-green-400 to-emerald-600 text-white outline-none  w-full rounded-xl"
                  whileHover={{ scale: 1.0}}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                >
                 { isLoading?  "Reseting": " set new password"}
                </motion.button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
