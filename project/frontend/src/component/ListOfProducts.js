import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Importing edit icon
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ListOfProducts = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  const navigate = useNavigate(); // To handle navigation

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  // Function to handle product edit
  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`); // Navigates to the edit page
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <div>
        <Link to={"/adminpanel"} className="flex items-center text-3xl p-1">
          <FaArrowAltCircleLeft />
          <span className="ml-3">Back</span>
        </Link>
      </div>

      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      <div className="flex gap-4 justify-center cursor-pointer overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4 capitalize">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <div key={el._id} className="relative">
                  <CardFeature
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                  />
                  {/* Edit icon with functionality */}
                  <FaEdit
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(el._id)}
                    title="Edit Product"
                  />
                </div>
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "allProduct"} />
            ))}
      </div>
    </div>
  );
};

export default ListOfProducts;
