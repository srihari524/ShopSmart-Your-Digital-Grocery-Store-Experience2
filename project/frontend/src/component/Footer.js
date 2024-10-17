import React from "react";
import logo from "../assest/logo.png";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <div className=" text-black flex flex-col items-center gap-5 p-8 mt-24">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-20">
        <div className="flex flex-col items-start gap-5">
          <img src={logo} className="h-9 w-22 rounded-md " alt="logo" />
          <p>
          The Grocery Store Application focuses on delivering a user-friendly
            and visually appealing experience to attract customers. With an
            intuitive interface, users can easily navigate through product
            categories, view detailed descriptions, and enjoy a smooth checkout
            process. The app offers personalized recommendations, special
            promotions, and a secure payment gateway, ensuring a convenient and
            enjoyable shopping experience that encourages customer loyalty and
            repeat visits.
          </p>
          <div className="flex gap-5">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/srihari-gudipati-0410a925a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/srihari524"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-xl font-bold">COMPANY</h2>
          <nav className=" flex flex-col gap-4 md:gap-7 text-3xl md:text-lg   md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
            <Link to={"filter/66fe3c0ac9f48e930f988d78"}></Link>
          </nav>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h2 className="font-bold text-black">GET IN TOUCH</h2>
          <nav>
            <a href="tel:+919347659937" className="mb-2">
              +91-9347XXXXXX
            </a>
            <br></br>
            <a href="mailto:harigudipati666@gmail.com">
              contact143@ShopSmart.com
            </a>
          </nav>
        </div>
      </div>
      <hr className="w-full my-5 border-gray-600" />
      <p className="text-center">
        Copyright 2024 @ ShopSmart.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
