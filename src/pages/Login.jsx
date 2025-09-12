import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {LoginApi} from '../services/operations/authApi'
// import { AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data--> ", data);
    // api caling her
    dispatch(LoginApi(data,navigate)); // login fucntion call

    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-md mx-auto space-y-4 "
    >
      <h2 className="text-2xl font-bold">Login</h2>

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

      {/* Password walla div  */}
      {/* Password Field */}
      <div>
        <label htmlFor="password" className="text-sm text-gray-700">
          Password <sup className="text-red-500">*</sup>
        </label>

        <div className="relative w-full">
            
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 mt-3 cursor-pointer text-xl text-gray-600"
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>

        {errors.password && (
          <span className="ml-2 text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* create account and forgot password  */}
      <div className=" flex text-sm space-x-2 ">
        <p>Don't have Account?</p>
        <Link to={"/signup"} className="text-blue-500">
          Create Account
        </Link>
      </div>

      <div>
        <Link to={"/ForgotPassword"} className="text-blue-500">
          Forgot Password
        </Link>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
