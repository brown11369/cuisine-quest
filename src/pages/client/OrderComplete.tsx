import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { FaCheckCircle } from "react-icons/fa";
// import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PATCH_CHECKOUT_COMPLETE } from "../../utils/constants";
import "./OrderComplete.css";

// toast.configure();

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
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userID: user._id }),
            },
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            // toast.success('Order completed successfully!', {
            //     icon: <FaCheckCircle />,
            // });
            console.log(responseData);
          } else {
            const errorData = await response.json();
            console.log(errorData);
            // toast.error(errorData.message || 'Something went wrong.');
          }
        } catch (error) {
          console.log("An error occurred while processing your request.");
          // toast.error('An error occurred while processing your request.');
        }
      };

      completeOrder();
    }
  }, [session_id, user._id]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="order-complete-container">
      <div className="icon-msg-container">
        <FaCheckCircle className="success-icon" />
        <h1 className="heading">Order Completed</h1>
      </div>
      <p className="session-id">
        Session ID: <strong>{session_id}</strong>
      </p>
      <p className="message">
        Thank you for your purchase! Your order has been successfully completed.
        We are processing your order and will update you once it's on its way.
      </p>
      <p className="message">
        If you have any questions or need further assistance, feel free to
        contact our support team.
      </p>
      <button className="home-button" onClick={handleGoHome}>
        Go Back to Home
      </button>
    </div>
  );
};

export default OrderComplete;
