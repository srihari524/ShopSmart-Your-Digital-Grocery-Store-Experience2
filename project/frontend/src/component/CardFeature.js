import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";
import { useDispatch } from "react-redux";

const CardFeature = ({ image, name, category, price, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="w-full min-w-[160px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-sm py-5 px-4 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105">
      {image ? (
        <>
          <Link
            to={`/filter/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full object-cover" alt="product" />
            </div>
            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </h3>
            <p className="text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-orange-500 text-white py-1 mt-2 rounded hover:bg-orange-600 w-full transition-colors duration-200 ease-in-out"
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
