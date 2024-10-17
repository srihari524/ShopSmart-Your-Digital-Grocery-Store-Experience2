import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Success = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigate]);

  return (
    <div className="bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg shadow-md rounded-md animate-blast">
      <p className="text-center">Payment was successful! You will be redirected shortly.</p>
    </div>
  );
};

export default Success;
