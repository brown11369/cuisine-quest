import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { STRIP_KEY, POST_CHECKOUT_SESSION } from "../../utils/constants";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { increment, decrement, removeItem } from "../../redux/slice/cartSlice";

const Cart = () => {
  const user = useSelector((store) => store.user.userInfo);
  const cartItems = useSelector((store) => store.cart.items);
  const totalItems = useSelector((store) => store.cart.totalQuantity);
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()


  const stripePromise = loadStripe(STRIP_KEY);

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

  const orderData = {
    user: user._id,
    items: cartItems,
    totalItems,
    totalPrice,
  };

  async function handlePayment(order) {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const res = await fetch(POST_CHECKOUT_SESSION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      await stripe.redirectToCheckout({ sessionId: data.stripeSession.id });
    } catch (err) {
      console.error('Error during checkout:', err);
    } finally {
      setLoading(false);
    }
  }


  const deleteItem = async (itemID) => {
    try {
      const response = await fetch(DELETE_CART_ITEM + itemID, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          console.log(responseData)
          dispatch(removeItem(item))
        }
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred while processing your request.");
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
            disabled={loading}>
            {loading ? 'Processing...' : 'Checkout'}
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
            {cartItems && cartItems.map((item) => {
              return (
                <tr key={item?._id} className="food-item">
                  <td>
                    <img src={item?.product?.imageURL} alt="" className="food-image" />
                  </td>
                  <td className="food-name">{item?.product?.name}</td>
                  <td className="quantity-container">
                    <button onClick={() => dispatch(decrement(item))} className="quantity-btn">-</button>
                    {item?.quantity}
                    <button onClick={() => dispatch(increment(item))} className="quantity-btn">+</button>
                  </td>
                  <td className="food-price">{item?.product?.price} * {item?.quantity}={item?.product?.price * item?.quantity}</td>
                  <td>
                    <button onClick={() => deleteItem(item?._id)} className="remove-btn">Remove</button>
                  </td>
                </tr>
              )
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
