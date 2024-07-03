import "./order.css"
import { useEffect, useState } from 'react';
import Menu from "../components/client/Header";
import Footer from "../components/client/Footer";

const Order = () => {

  let user = JSON.parse(localStorage.getItem('user'))

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getOrder();
  }, [])

  async function getOrder() {

    try {
      const response = await fetch(`https://shokumo-api.onrender.com/order/${user?.id}`)
      const data = await response.json()
      setOrders(data.reverse())
      console.log(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  function setBtn(status) {
    if (status === 0) {
      return (
        <>
          <button>Waiting For Acceptance</button><br />
          <p>Please Check After 5 min...</p>
        </>
      )
    }
    if (status === 1) {
      return (<button>Proceed To Checkout</button>)
    }
  }

  return (
    <>
      <Menu />
      <div className='orders'>
        <h2>Orders</h2>
        <div className='orders_container'>
          {
            orders?.map((list, index) => {
              let totalPrice = 0;
              return (
                <>
                  <div className='card' key={index}>
                    <div className='title'>
                      <strong>OrderID :</strong>
                      <p>{list?._id}</p>
                    </div>
                    <div className='list'>
                      {
                        list?.order.map((item, index) => {
                          totalPrice += ((item?.foodid?.price) * (item?.quantity))
                          return (
                            <>
                              <details key={index}>
                                <summary>
                                  <div>
                                    <h4>Item : {item?.foodid?.name}</h4>
                                  </div>
                                  <div>
                                    <p><strong>SubTotal : {(item?.foodid?.price) * (item?.quantity)}</strong></p>
                                  </div>
                                </summary>
                                <p><strong>Quantity : {item?.quantity}</strong></p>
                                <p><strong>Price : {item?.foodid?.price}</strong></p>

                              </details>
                            </>
                          )
                        })
                      }
                    </div>
                    <div className='total'>
                      <strong><p>TOTAL :{totalPrice}</p></strong>
                    </div>
                  </div>

                </>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Order