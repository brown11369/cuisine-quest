import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { api } from "@/services/api";
import type { IShippedOrder } from "@/types/order";

const Order = () => {
  const user = useAppSelector((store) => store.user.userInfo);
  const userId = user?._id;
  const [orders, setOrders] = useState<IShippedOrder[]>();
  const [openOrder, setOpenOrder] = useState<string | null>(null);

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

  const toggleOrder = (id: string) => {
    setOpenOrder(openOrder === id ? null : id);
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          {/* Order Header */}
          <button
            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
            onClick={() => toggleOrder(order._id)}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:w-full gap-1 sm:gap-0">
              <span className="text-gray-700 font-medium truncate">
                Order: {order._id}
              </span>
              <span className="text-gray-900 font-bold">
                {order.totalPrice} ₹
              </span>
              <span className="text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            {openOrder === order._id ? "+" : "-"}
          </button>

          {/* Order Items */}
          {openOrder === order._id && (
            <div className="p-4 space-y-4 border-t border-gray-200">
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.imageURL}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.quantity} × {item.product.price} ={" "}
                        {item.quantity * item.product.price} ₹
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Order;
