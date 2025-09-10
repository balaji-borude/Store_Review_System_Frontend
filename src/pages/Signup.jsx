import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    // api caling her

    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold">Create Account</h2>

      {/* Role based authe */}
      <div>
        <label htmlFor="role" className="text-sm text-gray-700">
          Role <sup className="text-red-500">*</sup>
        </label>

        <select
          id="role"
          className="form-style w-full border p-2 rounded"
          {...register("role", { required: "Role is required" })}
          defaultValue="Normal User"
        >
          <option value="User">User</option>
          <option value="StoreOwner">StoreOwner</option>
          <option value="Admin">Admin</option>
        </select>

        {errors.role && (
          <span className="ml-2 text-xs text-red-500">
            {errors.role.message}
          </span>
        )}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="text-sm text-gray-700">
          Name <sup className="text-red-500">*</sup>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          className="form-style w-full border p-2 rounded"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 20, message: "Min 20 characters required" },
            maxLength: { value: 60, message: "Max 60 characters allowed" },
          })}
        />
        {errors.name && (
          <span className="ml-2 text-xs text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-sm text-gray-700">
          Email <sup className="text-red-500">*</sup>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
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

      {/* Password */}
      <div className="relative w-full">
        <label htmlFor="password" className="text-sm text-gray-700">
          Password <sup className="text-red-500">*</sup>
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="form-style w-full border p-2 rounded"
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
          className="absolute right-3 mt-3 cursor-pointer text-xl text-gray-600"
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

      {/* Address */}
      <div>
        <label htmlFor="address" className="text-sm text-gray-700">
          Address <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="address"
          placeholder="Enter your address"
          className="form-style w-full border p-2 rounded"
          {...register("address", {
            required: "Address is required",
            maxLength: { value: 400, message: "Max 400 characters allowed" },
          })}
        />
        {errors.address && (
          <span className="ml-2 text-xs text-red-500">
            {errors.address.message}
          </span>
        )}
      </div>

      <div className="text-sm flex gap-x-2">
        <p>Already have an account?</p>
        <Link to="/" className="text-blue-500">
          Login Here
        </Link>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
