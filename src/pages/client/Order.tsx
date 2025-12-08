import "./order.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { GET_ORDERS } from "../../utils/constants";

const Order = () => {
  const user = useAppSelector((store) => store.user.userInfo);
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
          // console.log(fetchData?.orderData.reverse());
          setOrders(fetchData?.orderData.reverse());
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    })();
  }, [userId]);

  return (
    <div className="orders-container">
      {orders?.map((list, index) => (
        <details key={index} className="order-details">
          <summary className="order-summary">
            <p>{list?._id}</p>
            <strong>{list?.totalPrice} ₹</strong>
            <p>{list?.createdAt}</p>
          </summary>
          {list?.items.map((item, indx) => (
            <div key={indx} className="order-item">
              <p>{item?.product?.name}</p>
              <p>
                {" "}
                {item?.quantity} * {item?.product?.price} ={" "}
                {item?.product?.price * item?.quantity} ₹
              </p>
              <img
                src={item?.product?.imageURL}
                alt={item?.product?.name}
                className="product-image"
              />
            </div>
          ))}
        </details>
      ))}
    </div>
  );
};

export default Order;
