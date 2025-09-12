import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { signUp } from "../services/operations/authApi";

const Signup = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    dispatch(signUp(data, navigate));
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-2 sm:p-10"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

        {/* Role */}
        <div>
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role <sup className="text-red-500">*</sup>
          </label>
          <select
            id="role"
            className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            {...register("role", { required: "Role is required" })}
            defaultValue="User"
          >
            <option value="User">User</option>
            <option value="StoreOwner">StoreOwner</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role && <span className="text-xs text-red-500 mt-1 block">{errors.role.message}</span>}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name <sup className="text-red-500">*</sup>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 60, message: "Max 60 characters allowed" },
            })}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
        </div>

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
          {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password <sup className="text-red-500">*</sup>
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

        {/* Address */}
        <div>
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            Address <sup className="text-red-500">*</sup>
          </label>
          <textarea
            id="address"
            placeholder="Enter your address"
            className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            {...register("address", {
              required: "Address is required",
              maxLength: { value: 400, message: "Max 400 characters allowed" },
            })}
          />
          {errors.address && <span className="text-xs text-red-500 mt-1 block">{errors.address.message}</span>}
        </div>

        {/* Login link */}
        <div className="flex justify-center text-sm gap-x-2">
          <p>Already have an account?</p>
          <Link to="/" className="text-blue-500 hover:underline">Login Here</Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-3 rounded-lg shadow-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
