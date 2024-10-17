import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {user ? (
        <div>
          <p className="mb-2"><strong>Name:</strong> {user.FirstName}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
