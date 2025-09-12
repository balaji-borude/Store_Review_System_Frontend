import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores, CreateStore } from "../../../../services/operations/storeApi";

const AdminStores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stores, setStores] = useState([]);
  const dispatch = useDispatch();


  const {token} = useSelector((state)=> state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      const res = await dispatch(getAllStores());
      if (res) setStores(res);
    };
    fetchStores();
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    data.ownerId = Number(data.ownerId); 
    const res = await dispatch(CreateStore(data,token));
      if (res) {
        const updated = await dispatch(getAllStores());
        setStores(updated);
        reset();
        handleCloseModal();
      }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Admin Stores Dashboard
      </h1>
      <p className="mb-6 text-gray-600">
        Manage all stores: view, create, and update store details.
      </p>

      {/* Button to open modal */}
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors mb-6"
        onClick={handleOpenModal}
      >
        Create Store
      </button>

      {/* Store list */}
<div className="overflow-x-auto mt-6">
  {stores && stores.length > 0 ? (
    <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Email</th>
          <th className="py-3 px-4 text-left">Address</th>
          <th className="py-3 px-4 text-left">Rating</th>
          <th className="py-3 px-4 text-left">Owner ID</th>
        </tr>
      </thead>
      <tbody>
        {stores.map((store, index) => (
          <tr
            key={store.id || index}
            className="border-t hover:bg-gray-50 transition-colors"
          >
            <td className="py-2 px-4">{store.name}</td>
            <td className="py-2 px-4">{store.email}</td>
            <td className="py-2 px-4">{store.address}</td>
            <td className="py-2 px-4">{store.avgRating || "N/A"}</td>
            <td className="py-2 px-4">{store.ownerId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-500 text-center">No stores available.</p>
  )}
</div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Create Store</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Store Name */}
              <input
                type="text"
                placeholder="Store Name"
                {...register("name", { required: "Store name is required" })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              {/* Email */}
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

              {/* Address */}
              <textarea
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}

              {/* Owner ID */}
              <input
                type="number"
                placeholder="Owner ID"
                {...register("ownerId", { required: "Owner ID is required" })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.ownerId && (
                <span className="text-red-500">{errors.ownerId.message}</span>
              )}

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

export default AdminStores;
