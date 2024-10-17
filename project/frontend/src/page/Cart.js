import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handleOrder = async () => {
    if (user.emali) {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productCartItem),
      });
  
      if (res.status === 500) return;
  
      const data = await res.json();
      
      // Save order details after successful payment
      const orderDetails = {
        userId: user._id, // Make sure you have the user's ID
        cartItems: productCartItem.map(item => ({
          productId: item._id,
          qty: item.qty,
          price: item.price
        })),
        totalAmount: totalPrice
      };
  
      await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });
  
      toast("Redirect to payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast("You have not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl md:text-3xl font-bold text-slate-600 mb-4">Your Cart Items</h2>

      {productCartItem.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Display cart items */}
          <div className="w-full lg:w-2/3">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            ))}
          </div>

          {/* Total cart item summary */}
          <div className="w-full lg:w-1/3">
            <h2 className="bg-blue-500 text-white p-3 text-xl rounded-t-md">Summary</h2>
            <div className="bg-white shadow-md rounded-b-md p-4 space-y-4">
              <div className="flex justify-between text-lg border-b pb-2">
                <p>Total Qty :</p>
                <p className="font-bold">{totalQty}</p>
              </div>
              <div className="flex justify-between text-lg border-b pb-2">
                <p>Total Price :</p>
                <p className="font-bold text-red-500">₹ {totalPrice}</p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white rounded-md hover:bg-red-600 transition"
                onClick={handleOrder}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <img src={emptyCartImage} className="w-full max-w-sm" alt="Empty Cart" />
          <p className="text-slate-500 text-2xl font-bold mt-4">Your Cart is Empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
