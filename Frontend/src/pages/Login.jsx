import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,  Navigate } from "react-router-dom";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
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
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <div className="max-w-sm w-full">
          <div className="flex justify-center mb-12">
            <img src={logo} alt="logo" className="h-24 w-auto" />
          </div>
          <h1 className="text-4xl font-medium text-center mb-4">
            Welcome Back!!
          </h1>
          <p className="text-gray-800 text-center mb-10">
            Please enter your credential to log in
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <Link to="/password/forgot" className="font-semibold text-black">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`border-2 w-full font-semibold py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white border-black hover:bg-white hover:text-black"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Mobile View - Sign Up */}
            <div className="block md:hidden font-semibold mt-6 text-center">
              <p>
                New to our platform?{" "}
                <Link
                  to="/register"
                  className="text-gray-500 hover:underline ml-1"
                >
                  Sign Up
                </Link>
              </p>
            </div>
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
          <p className="text-gray-300 mb-12">
            New to our platform? Sign up now.
          </p>
          <Link
            to={"/register"}
            className="border-2 mt-5 border-white w-full font-semibold bg-black text-white px-8 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
