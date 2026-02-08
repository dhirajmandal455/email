import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";


const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const {error,isLoading,verifyEmail}=useAuthStore()

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle paste (multiple digits)
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");

      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }

      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;

      inputRef.current[focusIndex]?.focus();
    }
    // Handle single digit typing
    else {
      newCode[index] = value;
      setCode(newCode);

      // Move to next input automatically
      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode)
      navigate("/")
     
    } catch (err) {
      console.log(err)
    }
    
  };
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="max-w-md w-full  bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl  mx-auto  py-2 mt-30 overflow-hidden">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl  p-8 w-full max-w-md">
        <h2 className="text-green-400  text-center text-3xl font-bold mb-6 ">
          Verify your email
        </h2>
        <p className="text-gray-300 text-center  font-medium">
          Enter the 6 digit code sent to your email adress.
        </p>

        {/*  */}
        <form className="space-y-6">
          <div className="flex justify-between mt-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                maxLength="6"
                value={digit}
                type="text"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 text-center text-2xl font-bold bg-gray-800 text-white border-2 border-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-green-400 mt-1 mb-1">{error}</p>}
          <button
            className="
  relative px-6 py-3
  rounded-lg
  font-semibold text-white
  bg-linear-to-r
  from-[#1f8f5f]
  via-[#2fbf7a]
  to-[#1f8f5f]
  shadow-md
  overflow-hidden
  transition-all duration-300
  hover:brightness-100
  active:scale-95 w-full
"
          >
           {isLoading ? "verifing..." :" verify email"}

          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
