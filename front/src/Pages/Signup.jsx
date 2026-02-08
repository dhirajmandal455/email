import { User2, Lock, Mail, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    try {
      await signup(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mt-20 rounded-xl bg-black text-gray-300 p-6 overflow-hidden">
      <h2 className="text-center text-2xl text-green-300 font-semibold mb-6">
        Create account
      </h2>

      <form onSubmit={handleSubmit}>
        {/* name */}
        <div className="flex items-center gap-2 pl-3 rounded-lg bg-gray-950 border border-green-900/40 mb-5">
          <User2 size={21} className="text-green-400" />
          <input
            type="text"
            value={name}
            placeholder="Enter full name"
            className="w-full bg-transparent py-3 px-2 text-sm text-green-400 placeholder:text-green-700 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* email */}
        <div className="flex items-center gap-2 pl-3 rounded-lg bg-gray-950 border border-green-900/40 mb-5">
          <Mail size={21} className="text-green-400" />
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            className="w-full bg-transparent py-3 px-2 text-sm text-green-400 placeholder:text-green-700 outline-none"
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
            className="w-full bg-transparent py-3 px-2 text-sm text-green-400 placeholder:text-green-700 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
    {error && <p className="text-green-500 mt-2 mb-1">{error}</p>}
        <PasswordStrengthMeter />

        <button
          className="w-full relative px-6 py-3
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
             active:scale-95"
             disabled={isLoading}
        >
        {isLoading ? <Loader className=" animate-spin mx-auto" size={21}/>: "Signup"}
        </button>
        <div className="mt-4 px-8 bg-grya-900 text-gray-300 flex justify-center">
          <p>
            Allready have an account?{""}
            <Link to={"/login"} className="text-blue-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
