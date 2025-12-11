import "./order.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { api } from "@/services/api";
import type { IShippedOrder } from "@/types/order";

const Order = () => {
  const user = useAppSelector((store) => store.user.userInfo);
  const userId = user?._id;
  const [orders, setOrders] = useState<IShippedOrder[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userId) return;

        const response = await api.getOrders(userId);

        if (response.status === "success") {
          setOrders(response.data.orderData.reverse());
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
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
                {item?.quantity} × {item?.product?.price} ={" "}
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
