import "./order.css"
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { GET_ORDERS } from "../../utils/constants"

const Order = () => {
  const user = useSelector(store => store.user.userInfo)
  const userId = user?._id;
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (userId) {
          const response = await fetch(GET_ORDERS + userId);

          if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.status}`);
          }

          const fetchData = await response.json();
          console.log(fetchData?.orderData.reverse());
          setOrders(fetchData?.orderData.reverse());
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    })();
  }, [userId])


  return (
    <div className='orders'>
      <h2>Orders</h2>
      <div className='orders_container'>
        {
          orders?.map((list, index) => {
            return (
              <div className='card' key={index}>
                <div className='title'>
                  <strong>OrderID :</strong>
                  <p>{list?._id}</p>
                </div>
                <div className='list'>
                  {
                    list?.items.map((item, index) => {
                      return (
                        <>
                          <details key={index}>
                            <summary>
                              <div>
                                <h4>Item : {item?.product?.name}</h4>
                              </div>
                              <div>
                                <p><strong>SubTotal : {(item?.product?.price) * (item?.quantity)}</strong></p>
                              </div>
                            </summary>
                            <p><strong>Quantity : {item?.quantity}</strong></p>
                            <p><strong>Price : {item?.product?.price}</strong></p>

                          </details>
                        </>
                      )
                    })
                  }
                </div>
                <div className='total'>
                  <strong><p>Total {list?.totalItems} value :{list?.totalPrice}</p></strong>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order;