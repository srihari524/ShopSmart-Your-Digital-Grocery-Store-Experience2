import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CardFeature from "../component/CardFeature";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import Footer from "../component/Footer";
import Scroll from "./Scroll";
import Slide2 from "./Slide2";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const navigate = useNavigate(); // Hook for navigation

  const homeProductCartList = productData.slice(3, 9);
  
  const homeProductCartListFruits = productData.filter(
    (el) => el.category === "fruits",
    []
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
   
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
  

  // Function to handle "Order Now" button click
  const handleOrderNow = () => {
    // Navigate to the products or menu page where users can order
    navigate("/cart");
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Fast Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              alt="deliverylogo"
              className="h-7"
            />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold py-3  ">
            The Fastest Delivery in{" "}
            <span className="text-green-500">Your Home</span>
          </h1>
          <p className="py-3 text-base capitalize">
            The Grocery Store Application focuses on delivering a user-friendly
            and visually appealing experience to attract customers. With an
            intuitive interface, users can easily navigate through product
            categories, view detailed descriptions, and enjoy a smooth checkout
            process. The app offers personalized recommendations, special
            promotions, and a secure payment gateway, ensuring a convenient and
            enjoyable shopping experience that encourages customer loyalty and
            repeat visits.
          </p>
          <button
            onClick={handleOrderNow} // Add the onClick to handle navigation
            className="font-bold bg-red-500 text-slate-200 px-4 py-2 mt-3 rounded-md"
          >
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "Loading"} loading={"Loading....."} />
                );
              })}
        </div>
      </div>
      <div className="">
        <Scroll />
      </div>
    
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fruits
          </h2>

          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrFormPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrFormNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListFruits[0]
            ? homeProductCartListFruits.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "fruits"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature
                  loading="Loading...."
                  key={index + "CartLoading"}
                />
              ))}
        </div>
      </div>
      <div className="mt-4">
      <Slide2 />
      </div>
      <AllProduct heading={"Grocery & Kitchen"} />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
