import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PATCH_CHECKOUT_CANCEL } from "@/utils/constants";

const OrderCancel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");

  useEffect(() => {
    if (session_id) {
      const cancelOrder = async () => {
        try {
          const response = await fetch(
            `${PATCH_CHECKOUT_CANCEL}${session_id}`,
            {
              method: "PATCH",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ success: true }),
            },
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Order canceled:", data);
          } else {
            const errorData = await response.json();
            console.error("Error canceling order:", errorData.message);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

      cancelOrder();
    }
  }, [session_id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl max-w-lg w-full p-8 text-center flex flex-col items-center">
        <div className="text-red-500 mb-4">
          <FaTimesCircle className="text-6xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Order Canceled
        </h1>
        <p className="text-gray-600 mb-4">
          Your order has been successfully canceled.
        </p>
        {session_id && (
          <p className="text-sm text-gray-500 mb-6">
            Session ID: <strong>{session_id}</strong>
          </p>
        )}
        <Button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto"
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default OrderCancel;
