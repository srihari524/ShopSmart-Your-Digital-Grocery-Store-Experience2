import React from "react";
import { Link, Outlet } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaRegListAlt, FaAddressCard, FaCommentDots} from "react-icons/fa"; // Import icons
import { MdOutlineReviews } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 shadow-lg">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {userData.image ? (
              <img
                src={userData.image}
                className="w-20 h-20 rounded-full object-cover"
                alt="user"
              />
            ) : (
              <HiOutlineUserCircle className="text-gray-400" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold mt-2">Customer Name</p>
          <p className="text-md font-bold capitalize">
            {userData.lastName} {userData.firstName}
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <nav className="grid p-4 font-bold capitalize space-y-3">
          <Link
              to={"/profileinfo"} // Path to the ProfileInformation component
              className="flex items-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <HiOutlineUserCircle className="mr-2" /> Profile Information
            </Link>
            <Link
              to={"/edituser"}
              className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              <FaUserEdit className="mr-2" />Update Profile
            </Link>
            <Link
              to={"/myorders"}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <FaRegListAlt className="mr-2" /> Myorders
            </Link>
            <Link
              to={"/address"}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              <FaAddressCard className="mr-2" /> Add Addresses
            </Link>
            <Link
              to={"/contact"}
              className="flex items-center px-3 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition"
            >
              <FaCommentDots className="mr-2" /> Raise Complaints
            </Link>
            <Link
              to={"/review"}
              className="flex items-center px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              <MdOutlineReviews className="mr-2" /> Review Or FeedBack
            </Link>
            <Outlet />
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Profile;
