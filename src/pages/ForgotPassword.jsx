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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold">Reset Password</h2>

      {/* Email div */}
      <div>
        <label htmlFor="email" className="text-sm text-gray-700">
          Email <sup className="text-red-500">*</sup>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your registered email"
          className="form-style w-full border p-2 rounded"

          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <span className="ml-2 text-xs text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* New Password */}
      <div className="relative w-full">
        <label htmlFor="password" className="text-sm text-gray-700">
          New Password <sup className="text-red-500">*</sup>
        </label>


        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          className="form-style w-full border p-2 rounded pr-10"
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
          className="absolute right-3 top-9 cursor-pointer text-xl text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>

        {errors.password && (
          <span className="ml-2 text-xs text-red-500">
            {errors.password.message}
          </span>
        )}

      </div>

      {/* Confirm Password */}
      <div className="relative w-full">
        <label htmlFor="confirmPassword" className="text-sm text-gray-700">
          Confirm Password <sup className="text-red-500">*</sup>
        </label>

        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter new password"
          className="form-style w-full border p-2 rounded pr-10"

          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        <span
          className="absolute right-3 top-9 cursor-pointer text-xl text-gray-600"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
        {errors.confirmPassword && (

          <span className="ml-2 text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
         <div className=" flex text-sm space-x-2 ">
                <p>Know Password ?</p>
                <Link to={"/login"} className="text-blue-500">
                  Go to Login
                </Link>
              </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPassword;
