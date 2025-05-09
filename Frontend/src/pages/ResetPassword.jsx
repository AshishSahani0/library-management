import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ password, confirmPassword }, token));
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
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-black text-white rounded-tr-[80px] rounded-br-[80px] p-8">
        <div className="text-center h-[450px]">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="BookWorm Logo" className="h-44 w-auto mb-12" />
          </div>
          <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">
            "Your premier digital library for borrowing and reading books"
          </h3>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link
          to="/password/forgot"
          className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
        >
          Back
        </Link>

        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <div className="rounded-full flex items-center justify-center">
              <img src={logo} alt="Logo" className="h-24 w-auto" />
            </div>
          </div>

          <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">
            Reset Password
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Please enter your new password
          </p>

          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 mb-4 border border-black rounded-md focus:outline-none"
            />
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 mb-6 border border-black rounded-md focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-md text-white transition ${
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

export default ResetPassword;
