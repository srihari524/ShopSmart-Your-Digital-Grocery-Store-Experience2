import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { IoSearch } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
    navigate("/"); // Navigate to the home page after logout
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-slate-900">
      {/* Desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full rounded-xl" alt="logo" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-lg text-white md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-white relative">
          <Link to={"search"}><TbSearch /></Link>
          </div>
          <div className="text-2xl text-white relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer text-white w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" alt="user" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {/* Show Admin Panel if logged in as admin */}
                {userData.emali === process.env.REACT_APP_ADMIN_EMAIL ? (
                  <Link to={"adminpanel"} className="whitespace-nowrap cursor-pointer px-2">
                    Admin Panel
                  </Link>
                ) : (
                  // Show MyProfile only if logged in and not admin
                  userData._id && (
                    <Link to={"profile"} className="whitespace-nowrap cursor-pointer px-2">
                      MyProfile
                    </Link>
                  )
                )}

                {/* Logout button shown only if logged in */}
                {userData._id ? (
                  <p className="cursor-pointer text-white px-2 bg-red-500" onClick={handleLogout}>
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  // Show Login if not logged in
                  <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2">
                    Login
                  </Link>
                )}

                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">Home</Link>
                  <Link to={"search"} className="px-2 py-1"><IoSearch /></Link>
                  <Link to={"menu"} className="px-2 py-1">Menu</Link>
                  <Link to={"about"} className="px-2 py-1">About</Link>
                  <Link to={"contact"} className="px-2 py-1">Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
