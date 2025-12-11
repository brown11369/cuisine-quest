import "./cart.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
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

  if (cartItems?.length === 0) {
    return (
      <div className="empty-cart-container">
        <img
          src="https://aleointernational.com/img/empty-cart-yellow.png"
          alt="empty cart"
          className="empty-cart-image"
        />
        <p className="empty-cart-text">Your cart is empty!</p>
      </div>
    );
  }

  const orderData: IOrderData = {
    user: user._id,
    items: cartItems,
    totalItems,
    totalPrice,
  };

  async function handlePayment(order: IOrderData) {
    setLoading(true);
    try {
      const response = await api.createCheckoutSession(order);

      if (response.status !== "success") {
        throw new Error("Failed to create checkout session");
      }

      const checkoutUrl = response.data.stripeSession.url;

      if (!checkoutUrl) {
        throw new Error("Stripe checkout URL missing");
      }
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Error during checkout:", err);
    } finally {
      setLoading(false);
    }
  }

  const deleteItem = async (cartItem: ICartItem) => {
    const { _id } = cartItem;
    try {
      const response = await api.removeCartItem(_id);
      if (response.status === "success") {
        dispatch(removeItem(cartItem));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="container-center cart-flow">
        <div className="cart-header">
          <span className="total-price">Total: {totalPrice} ₹</span>
          <button
            className="checkout-button"
            onClick={() => handlePayment(orderData)}
            disabled={loading}
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
        </div>
        <table>
          {/* <thead>
                <tr className="food-item">
                    <th>image</th>
                    <th>name</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>action</th>
                </tr>
            </thead> */}
          <tbody>
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <tr key={item?._id} className="food-item">
                    <td>
                      <img
                        src={item?.product?.imageURL}
                        alt=""
                        className="food-image"
                      />
                    </td>
                    <td className="food-name">{item?.product?.name}</td>
                    <td className="quantity-container">
                      <button
                        onClick={() => dispatch(decrement(item))}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      {item?.quantity}
                      <button
                        onClick={() => dispatch(increment(item))}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </td>
                    <td className="food-price">
                      {item?.product?.price} * {item?.quantity}=
                      {item?.product?.price * item?.quantity}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteItem(item)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          {/* <tfoot>
                <tr>
                    <td colSpan="5">All Cart Product</td>
                </tr>
            </tfoot> */}
        </table>
      </div>
    </div>
  );
};

export default Cart;
