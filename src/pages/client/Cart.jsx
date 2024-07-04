import "./cart.css";
import CartItem from "../../components/client/CartItem";
import { useSelector } from "react-redux";
import { STRIP_KEY, POST_CHECKOUT } from "../../utils/constants"
import { loadStripe } from "@stripe/stripe-js";


const Cart = () => {
  const user = useSelector(store => store.user.userInfo)
  const cartItem = useSelector(store => store.cart.items)
  const totalItems = useSelector(store => store.cart.totalQuantity)
  const totalPrice = useSelector(store => store.cart.totalPrice)

  const stripePromise = loadStripe(STRIP_KEY)


  if (cartItem?.length === 0) {
    return (
      <div className="container">
        <div className="container-center direction">
          <img src="https://aleointernational.com/img/empty-cart-yellow.png" alt="empty cart" />
        </div>
      </div>
    )
  }
  
  const orderData = {
    user: user._id,
    items: cartItem,
    totalItems,
    totalPrice
  }

  async function handlePayment(order) {
    try {
      const stripe = await stripePromise;
      let res = await fetch(POST_CHECKOUT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(order)
      })

      let data = await res.json();
      await stripe.redirectToCheckout({
        sessionId: data.stripeSession.id
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="container-center direction">
        <table>
          {/* <thead>
            <tr>
              <th>image</th>
              <th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th>action</th>
            </tr>
          </thead> */}
          <tbody>
            {cartItem && cartItem.map((item) => <CartItem key={item?._id} item={item} />)}
          </tbody>
        </table>
        <div>
          <span>Total : {totalPrice} ₹</span>
          <button onClick={() => { handlePayment(orderData) }}>checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
