import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { LoginApi } from '../services/operations/authApi';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data--> ", data);
    dispatch(LoginApi(data, navigate));
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6 sm:p-10"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email <sup className="text-red-500">*</sup>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-500 mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password <sup className="text-red-500">*</sup>
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 p-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" },
                maxLength: { value: 16, message: "Max 16 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message: "Must contain 1 uppercase & 1 special character",
                },
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500 mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex justify-between items-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <Link to="/ForgotPassword" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-3 rounded-lg shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
