import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Review = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productName: '',
    rating: '',
    comment: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success toast notification
        toast.success(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', productName: '', rating: '', comment: '' }); // Clear form after submission
        
        // Set a timer to navigate to home page after 3 seconds
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 3000); // Wait for 3 seconds before redirecting
      } else {
        // Show error toast notification
        toast.error(data.message || 'Error sending message. Please try again.');
      }
    } catch (error) {
      // Show error toast notification
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            min="1" max="5"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default Review;
