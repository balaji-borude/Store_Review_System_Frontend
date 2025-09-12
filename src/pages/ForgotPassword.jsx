import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Password Reset Data:", data);
    //  API call here to update password
    reset();

  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6 sm:p-10"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Reset Password</h2>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email <sup className="text-red-500">*</sup>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your registered email"
            className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
        </div>

        {/* New Password */}
        <div className="relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            New Password <sup className="text-red-500">*</sup>
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="mt-2 w-full border border-gray-300 p-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
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
          {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password <sup className="text-red-500">*</sup>
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter new password"
            className="mt-2 w-full border border-gray-300 p-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
          >
            {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          {errors.confirmPassword && <span className="text-xs text-red-500 mt-1 block">{errors.confirmPassword.message}</span>}
        </div>

        {/* Back to Login */}
        <div className="flex justify-center text-sm gap-x-2">
          <p>Know Password?</p>
          <Link to="/" className="text-blue-500 hover:underline">Go to Login</Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-3 rounded-lg shadow-md"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
