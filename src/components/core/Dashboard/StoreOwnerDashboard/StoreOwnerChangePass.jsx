import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { changePasswordApi } from "../../../../services/operations/authApi"; 

const StoreOwnerChangePass = () => {
  const { token } = useSelector((state) => state.auth); // get token from auth slice

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    // Pass the correct field names to match backend expectation
    const passwordData = {
      password: data.currentPassword,  // backend expects 'password' for current password
      newPassword: data.newPassword
    };
    
    dispatch(changePasswordApi(passwordData, token));
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Current Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter current password"
            {...register("currentPassword", { required: "Current password is required" })}
            className="w-full border px-3 py-2 pr-10 rounded-md"
          />
          {/* Eye Icon for Current Password */}
          <span
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-8 cursor-pointer text-xl text-gray-600"
          >
            {showCurrentPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              maxLength: { value: 16, message: "Max 16 characters" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message: "Must contain 1 uppercase & 1 special character",
              },
            })}
            className="w-full border px-3 py-2 pr-10 rounded-md"
          />
          {/* Eye Icon for New Password */}
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-8 cursor-pointer text-xl text-gray-600"
          >
            {showNewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            className="w-full border px-3 py-2 pr-10 rounded-md"
          />
          {/* Eye Icon for Confirm Password */}
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 cursor-pointer text-xl text-gray-600"
          >
            {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default StoreOwnerChangePass;