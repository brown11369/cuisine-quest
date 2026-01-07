import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PATCH_CHECKOUT_COMPLETE } from "@/utils/constants";

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");
  const user = useAppSelector((store) => store.user.userInfo);

  useEffect(() => {
    if (session_id) {
      const completeOrder = async () => {
        try {
          const response = await fetch(
            `${PATCH_CHECKOUT_COMPLETE}${session_id}`,
            {
              method: "PATCH",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userID: user._id }),
            },
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Order completed:", data);
          } else {
            const errorData = await response.json();
            console.error("Error completing order:", errorData);
          }
        } catch (error) {
          console.error(error);
        }
      };

      completeOrder();
    }
  }, [session_id, user._id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl max-w-lg w-full p-8 text-center flex flex-col items-center">
        <div className="text-green-500 mb-4">
          <FaCheckCircle className="text-6xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Order Completed!
        </h1>
        {session_id && (
          <p className="text-sm text-gray-500 mb-6">
            Session ID: <strong>{session_id}</strong>
          </p>
        )}
        <p className="text-gray-600 mb-4">
          Thank you for your purchase! Your order has been successfully
          completed. We are processing it and will update you once it's on its
          way.
        </p>
        <p className="text-gray-600 mb-6">
          If you have any questions or need assistance, feel free to contact our
          support team.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default OrderComplete;
