import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// api calling
import { signUpByAdmin } from "../../../../services/operations/authApi";
import { getAllUser } from "../../../../services/operations/authApi";

const AdminUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("User"); // default role
  const [showPassword, setShowPassword] = useState(false);

  // setUser madhe data add kela api call zalyavr
  const [users, setUsers] = useState([]); 

  // 🔹 new states for search + filter
  const [searchTerm, setSearchTerm] = useState(""); 
  const [roleFilter, setRoleFilter] = useState("All"); 

  const dispatch = useDispatch();

  // call api of getAll users
  useEffect(() => {
    const getUsers = async () => {
      const res = await dispatch(getAllUser());

      if (res) {
        setUsers(res.data); 
      }
    };
    getUsers();
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpenModal = (roleType) => {
    setRole(roleType); // "User" or "Admin"
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset(); // Reset form fields
  };

  const onSubmit = (data) => {
    const formData = { ...data, role };
    console.log("Submitting form:", formData);

    // api calling
    dispatch(signUpByAdmin(formData));

    reset();
    handleCloseModal();
  };

  //Filtering logic 
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All" ? true : user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Admin Users Dashboard
      </h1>


      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <button
          className="bg-blue-500 text-white px-9 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full sm:w-auto"
          onClick={() => handleOpenModal("User")}
        >
          Create New User
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full sm:w-auto"
          onClick={() => handleOpenModal("Admin")}
        >
          Create New Admin User
        </button>
      </div>

      {/*  Search & Role Filter UI */}
      <div className="flex flex-col sm:flex-row  items-center mb-6 gap-4">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search by name, email, address, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role filter dropdown */}
        <div className="">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-2 py-2 rounded-lg"
        >
          <option value="All">All Roles</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="StoreOwner">StoreOwner</option>
        </select>

        </div>
      </div>

      {/* List of users */}
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
          <thead className="bg-gray-100">
            <tr className="text-center">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal (unchanged) */}
       {/* Modal  data */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Create {role}</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* name */}
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  // minLength: { value: 20, message: "Min 20 characters required" },
                  maxLength: {
                    value: 60,
                    message: "Max 60 characters allowed",
                  },
                })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              {/* email */}
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              {/* password */}
              {/* Password */}
              <div className="relative w-full">
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
                <textarea
                  id="address"
                  placeholder="Enter your address"
                  className="form-style w-full border p-2 rounded"
                  {...register("address", {
                    required: "Address is required",
                    maxLength: {
                      value: 400,
                      message: "Max 400 characters allowed",
                    },
                  })}
                />
                {errors.address && (
                  <span className="ml-2 text-xs text-red-500">
                    {errors.address.message}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
