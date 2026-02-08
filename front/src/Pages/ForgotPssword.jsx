import { useState } from "react";
import { motion, spring } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPssword = () => {
  const [email, setEmail] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const { forgotPassword, isLoading } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmited(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-30 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop:blur-lg rounded-xl shadow-2xl border border-gray-800 "
    >
      <div>
        <h2 className="text-3xl text-emerald-500 text-center font-bold">
          Forgot Password
        </h2>
        {!isSubmited ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-400 text-center mt-3 py-1">
              Enter your email adress and we`ll send a link to forgot password.
            </p>
            <div className="flex items-center gap-2 pl-3 rounded-lg bg-gray-800 border border-gray-700 mb-4 py-1 mt-5">
              <Mail className="text-emerald-500" size={22} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter  Email"
                className="text-gray-300 text-sm w-full py-2 outline-none bg-transparent px-2 "
              />
            </div>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="text-center text-2xl font-bold px-3 py-2 bg-linear-to-r from-green-400 to-emerald-600 text-white outline-none  w-full rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={""}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={21} /> : " Send reset link"}
              </motion.button>
            </motion.div>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-4 mx-auto p-2"
            >
              <Mail className="text-white " size={21} />
            </motion.div>
            <p className="text-gray-300 mb-6">
              if an account exites fro {email} ,you will receive a password
              reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="  mt-3 w-full">
        <Link to={"/login"} className="flex items-center gap-4 ">
          <ArrowLeft className="text-gray-300" size={19} />
          <span className="text-gray-300">Back to login</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPssword;
