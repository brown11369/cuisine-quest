import "./OrderCancel.css"; // Import the CSS file for additional styling
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { PATCH_CHECKOUT_CANCEL } from "../../utils/constants";

const OrderCancel = () => {
  const location = useLocation();
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
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ success: true }),
            },
          );

          if (response.ok) {
            const responseData = await response.json();
            console.error(responseData);
          } else {
            const errorData = await response.json();
            console.error(errorData.message);
          }
        } catch (error) {
          console.error("An error occurred while processing your request.");
        }
      };

      cancelOrder();
    }
  }, [session_id]);

  return (
    <div className="order-cancel-container">
      <div className="icon-msg-container">
        <FaTimesCircle className="error-cancel-icon" />
        <h1 className="heading">Order Canceled</h1>
      </div>
      <p className="message success-message">
        Your order has been successfully canceled.
      </p>
      <p className="session-id">
        Session ID: <strong>{session_id}</strong>
      </p>
      <button
        className="home-button"
        onClick={() => (window.location.href = "/")}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default OrderCancel;
