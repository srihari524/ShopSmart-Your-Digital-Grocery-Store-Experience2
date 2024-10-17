import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice"; // Import the updateUser action
import { ImagetoBase64 } from "../utility/ImagestoBase64"; // Import the base64 converter function

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch the current user data from the Redux store
  const userData = useSelector((state) => state.user);

  // Local state for form data, with a fallback if userData is not loaded
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "", // Safe access with fallback
    lastName: userData?.lastName || "",
    emali: userData?.emali || "",
    image: userData?.image || "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        emali: userData.emali,
        image: userData.image,
      });
    }
  }, [userData]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image change and convert to base64
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await ImagetoBase64(file);
      setFormData({
        ...formData,
        image: base64Image,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...formData }));
    navigate("/profile");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="emali" // keep typo as requested
              value={formData.emali}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </div>
      </form>

      {formData.image && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Image Preview</h3>
          <img src={formData.image} alt="Profile Preview" className="w-40 h-40 mx-auto object-cover rounded-md shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default EditUser;
