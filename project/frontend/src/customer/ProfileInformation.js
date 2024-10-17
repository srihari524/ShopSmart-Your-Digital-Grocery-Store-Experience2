import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux"; // Assuming user information is stored in Redux
import { Link } from "react-router-dom";

const ProfileInformation = () => {
  const userData = useSelector((state) => state.user); // Get the logged-in user data from Redux
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user profile data
  useEffect(() => {
    if (userData?.emali) {
      fetchProfileData(userData.emali);
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  }, [userData]);

  const fetchProfileData = async (email) => {
    try {
      const addressResponse = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/address?email=${email}`
      );
      const addressData = await addressResponse.json();

      if (addressResponse.ok) {
        setProfileData(addressData); // Save the address data
      } else {
        throw new Error(addressData.message || "Error fetching address");
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Failed to fetch profile information add the address.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading profile information...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
      <div className="mb-4">
        <Link to="/profile" className="flex items-center text-lg text-blue-600 hover:text-blue-800">
          <FaArrowAltCircleLeft className="mr-2" />
          Back
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Profile Information</h1>

      <div className="flex items-center mb-4">
        <img
          src={userData.image || "/default-avatar.png"} // Display user image if available
          alt="User Avatar"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-lg font-semibold capitalize">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-gray-500">{userData.emali}</p>
        </div>
      </div>

      {profileData && profileData.street ? (
        // If address exists, show the address details
        <div className="border-t pt-4">
          <h2 className="text-lg font-bold mb-2">Address:</h2>
          <p className="text-gray-700">{profileData.street}</p>
          <p className="text-gray-700">{profileData.city}</p>
          <p className="text-gray-700">{profileData.state}</p>
          <p className="text-gray-700">{profileData.country}</p>
          <p className="text-gray-700">{profileData.postalCode}</p>
          <p className="text-gray-700">{profileData.phone || "Phone not available"}</p>
        </div>
      ) : (
        // If no address exists, prompt to add address
        <div className="text-center">
          <p className="text-gray-500 mb-4">You have not added an address yet.</p>
          <Link
            to="/add-address"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Address
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileInformation;
