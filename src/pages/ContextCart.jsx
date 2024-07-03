import React, { useContext, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Items from "./Items";
import { CartContext } from "./Cart";

import { loadStripe } from '@stripe/stripe-js';



const ContextCart = () => {

  const stripePromise = loadStripe('pk_test_51MF0AcSHgVbyLoUaDpchosqxG1XliOG66A3ktc91ysOVQwpJry091KwY8A1i9Rxu1bDc4BXSaT3UJN5WMKYyB3Fe00rYJlMTDV');

  const { addItem, item, clearCart, totalItem, totalAmount } = useContext(CartContext);

  useEffect(() => {
    cartItem()
  }, [])


  const user = (JSON.parse(localStorage.getItem("user")))

  const cartItem = async () => {
    try {
      const response = await fetch(`https://shokumo-api.onrender.com/cart/${user?.id}`)
      const data = await response.json()
      addItem(data)
    }
    catch (err) {
      console.log(err)
    }

  }

  // ?????????????????????????????????????????????????????????????


  async function handlePayment(order) {
    try {
      const stripe = await stripePromise;
      let res = await fetch(`https://shokumo-api.onrender.com/create-checkout-session`, {
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





  // /////////////////////////////////////////////////////////////


  if (item?.length === 0) {
    return (
      <>
        <section className="main-cart-section">
          <h1>shopping Cart</h1>
          <p className="total-items">
            you have <span className="total-items-count">{totalItem} </span>{" "}
            items in shopping cart
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="main-cart-section">
        <h1>shopping Cart</h1>
        <p className="total-items">
          you have <span className="total-items-count">{totalItem} </span> items
          in shopping cart
        </p>

        <div className="cart-items">
          <div className="cart-items-container">
            <Scrollbars>
              {item?.map((curItem, index) => {
                return <Items key={index} curItem={curItem} />;
              })}
            </Scrollbars>
          </div>
        </div>

        <div className="card-total">
          <h3>
            Cart Total : <span>{totalAmount}₹</span>
          </h3>
          <button onClick={()=>{
            handlePayment(item)
          }}>checkout</button>
          {/* <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button> */}
        </div>
      </section>
    </>
  );
};

export default ContextCart;
