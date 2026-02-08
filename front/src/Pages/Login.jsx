import React from "react";
import { User2, Lock, Mail, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,error,isLoading} =useAuthStore();

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log({  email, password });
    try {
      await login(email,password);
      navigate("/")
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="max-w-md w-full  mx-auto mt-20 rounded-xl bg-black text-gray-300 p-6 overflow-hidden">
      <h2 className="text-center text-2xl text-green-300 font-semibold mb-6">
        Welcome back
      </h2>

      <form onSubmit={handleLogin}>

        {/* email */}
        <div className="flex items-center gap-2 pl-3 rounded-lg bg-gray-950 border border-green-900/40 mb-5">
          <Mail size={21} className="text-green-300" />
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            className="w-full bg-transparent py-3 px-2 text-sm text-gray-300  outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password */}
        <div className="flex items-center gap-2 pl-3 rounded-lg bg-gray-950 border border-green-900/40 mb-5">
          <Lock size={21} className="text-green-400" />
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            className="w-full bg-transparent py-3 px-2 text-sm text-gray-300  outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/*  */}
        <div className=" mb-2 px-2 py-2">
        <Link to={"/forgot-password"} className="text-green-800">
          forgot password
        </Link>
        </div>
        {error && <p className="text-green-400 p-1">{error}</p>}
          
        {/*  */}
        <button className="w-full relative px-6 py-3
  rounded-lg
  font-semibold text-white
  bg-linear-to-r
  from-[#1f8f5f]
  via-[#2fbf7a]
  to-[#1f8f5f]
  shadow-md
  overflow-hidden
  transition-all duration-300
  hover:brightness-110
  active:scale-95" disabled={isLoading}>
         {  isLoading ? <Loader className="text-center mx-auto animate-spin"/>:" Login"}
        </button>
        <div className="mt-4 px-8 bg-grya-900 text-gray-300 flex justify-center">
          <p>
            create account?{""}
            <Link to={"/signup"} className="text-blue-700 hover:underline">
              signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
