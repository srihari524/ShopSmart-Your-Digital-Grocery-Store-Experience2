import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { _id: userId } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/my-orders?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-center text-lg">Loading your orders...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="mb-4">
        <Link to="/profile" className="flex items-center text-lg text-blue-600 hover:text-blue-800">
          <FaArrowAltCircleLeft className="mr-2" />
          Back
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Products</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Order Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition duration-200">
                <td className="border px-4 py-2">
                  {order.cartItems.map((item) => (
                    <div key={item.productId._id} className="flex items-center mb-2">
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover mr-2"
                      />
                      <span>
                        {item.productId.name} (Qty: {item.qty}, Price: ₹{item.price})
                      </span>
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">₹{order.totalAmount}</td>
                <td className="border px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
