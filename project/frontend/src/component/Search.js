import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";

const Search = () => {
  const productData = useSelector((state) => state.product.productList);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filter products based on the search term
    if (searchTerm) {
      const filtered = productData.filter((product) =>
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productData); // Show all products if search term is empty
    }
  }, [searchTerm, productData]);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">Search Products</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="flex flex-wrap justify-center gap-4 my-4 capitalize">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          ))
        ) : (
          <div>No products found for this category.</div>
        )}
      </div>
    </div>
  );
};

export default Search;
