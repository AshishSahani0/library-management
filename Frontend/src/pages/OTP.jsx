import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, Link } from "react-router-dom";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    
    dispatch(otpVerification( email, otp ));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
     
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link
          to={"/register"}
          className="border-2 border-black rounded-3xl font-bold w-52 py-2 absolute top-10 left-4 hover:bg-black hover:text-white transition duration-300 text-center"
        >
          Back
        </Link>
        <div className="max-w-sm w-full">
          <div className="flex justify-center mb-12">
            <img src={logo} alt="logo" className="h-24 w-auto" />
          </div>
          <h1 className="text-4xl font-medium text-center mb-12">
            Check your mailbox
          </h1>
          <p className="text-gray-800 text-center mb-12">
            Please enter the OTP to proceed
          </p>
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`border-2 mt-5 w-full font-semibold py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white border-black hover:bg-white hover:text-black"
              }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
        <div className="text-center h-[400px]">
          <div className="flex justify-center mb-12">
            <img
              src={logo_with_title}
              alt="logo"
              className="mb-12 h-44 w-auto"
            />
          </div>
          <p className="text-gray-300 mb-12">New to our platform? Sign up now.</p>
          <Link
            to={"/register"}
            className="border-2 mt-5 border-black w-full font-semibold bg-black text-white px-8 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTP;
