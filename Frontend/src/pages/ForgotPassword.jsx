import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)); 
  };
  

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, message, error]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-black text-white rounded-tr-[80px] rounded-br-[80px] p-10">
        <img src={logo_with_title} alt="BookWorm Logo" className="h-20 mb-6" />
        <h2 className="text-2xl font-light">"Your premier digital<br />library for borrowing<br />and reading books"</h2>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-10">
            <img src={logo} alt="Logo" className="h-20" />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-2">Forgot Password</h1>
          <p className="text-center text-gray-600 mb-6">Please enter your email</p>

          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              
              className="w-full px-4 py-3 mb-4 border border-black rounded-md focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold rounded-md text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-white hover:text-black border-2 border-black"
              }`}
            >
              {loading ? "Sending..." : "RESET PASSWORD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
