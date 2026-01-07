import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increment, decrement, removeItem } from "@/redux/slice/cartSlice";
import { api } from "@/services/api";
import type { ICartItem } from "@/types/cartItems";
import type { IOrderData } from "@/types/order";

const Cart = () => {
  const user = useAppSelector((store) => store.user.userInfo);
  const cartItems = useAppSelector((store) => store.cart.items);
  const totalItems = useAppSelector((store) => store.cart.totalQuantity);
  const totalPrice = useAppSelector((store) => store.cart.totalPrice);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  if (!cartItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src="https://aleointernational.com/img/empty-cart-yellow.png"
          alt="empty cart"
          className="w-40 mb-6"
        />
        <p className="text-lg font-medium text-gray-500">Your cart is empty!</p>
      </div>
    );
  }

  const orderData: IOrderData = {
    user: user._id,
    items: cartItems,
    totalItems,
    totalPrice,
  };

  const handlePayment = async (order: IOrderData) => {
    setLoading(true);
    try {
      const response = await api.createCheckoutSession(order);

      if (response.status !== "success") throw new Error("Failed checkout");

      const checkoutUrl = response.data.stripeSession.url;
      if (!checkoutUrl) throw new Error("Stripe URL missing");

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (cartItem: ICartItem) => {
    try {
      const response = await api.removeCartItem(cartItem._id);
      if (response.status === "success") dispatch(removeItem(cartItem));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Cart Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <span className="text-2xl font-bold text-gray-800">
          Total: ₹{totalPrice}
        </span>
        <button
          onClick={() => handlePayment(orderData)}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white font-semibold transition-colors
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-100">
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-3">
                  <img
                    src={item.product.imageURL}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-700">
                  {item.product.name}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => dispatch(decrement(item))}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increment(item))}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  ₹{item.product.price * item.quantity}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => deleteItem(item)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
