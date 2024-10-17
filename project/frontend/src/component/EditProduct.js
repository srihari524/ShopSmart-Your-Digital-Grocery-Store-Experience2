import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../redux/productSlide"; // Import the update product action
import { ImagetoBase64 } from "../utility/ImagestoBase64"; // Import the base64 converter function

const EditProduct = () => {
  const { productId } = useParams(); // Get productId from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch the current product data from the Redux store
  const productData = useSelector((state) =>
    state.product.productList.find((product) => product._id === productId)
  );

  // Local state for form data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "", // Base64 string or image URL
    description: "",
  });

  useEffect(() => {
    if (productData) {
      // Populate the form with the current product data
      setFormData({
        name: productData.name,
        category: productData.category,
        price: productData.price,
        image: productData.image, // The image will initially be a URL from the database
        description: productData.description,
      });
    }
  }, [productData]);

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
      const base64Image = await ImagetoBase64(file); // Convert image to base64
      setFormData({
        ...formData,
        image: base64Image, // Set the base64 image data
      });
    }
  };

  // Handle form submission to update the product
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...formData, _id: productId })); // Dispatch the update product action with base64 image
    navigate("/listofproducts"); // Redirect back to the product list page
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange} // Handle image file change
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="4"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update Product
          </button>
        </div>
      </form>

      {/* Preview the base64 image if available */}
      {formData.image && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Image Preview</h3>
          <img src={formData.image} alt="Product Preview" className="w-40 h-40 mx-auto object-cover rounded-md shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default EditProduct;
