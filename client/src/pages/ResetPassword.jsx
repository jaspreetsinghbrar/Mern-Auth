import { useNavigate } from "react-router-dom";
import { assets } from "./../assets/assets";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const { backendUrl } = useContext(AppContext);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        setIsEmailSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 sm:w-32 w-28 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      {/*Email to send password reset otp */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl text-center font-semibold mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img className="w-3 h-3" src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}
      {/*otp entry form */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl text-center font-semibold mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email
          </p>
          <div onPaste={handlePaste} className="flex justify-between mb-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}
      {/*enter new password */}
      {isEmailSent && isOtpSubmitted && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl text-center font-semibold mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your new password below
          </p>
          <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img className="w-3 h-3" src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
export default ResetPassword;
