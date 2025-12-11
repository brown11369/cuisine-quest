import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { POST_USER_LOGOUT } from "@/utils/constants";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItems } from "@/redux/slice/cartSlice";
import { removeAccessToken } from "@/redux/slice/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "@/services/api";

export default function Header() {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const user = useAppSelector((state) => state.user.userInfo);
  const cartTotalItems = useAppSelector((state) => state.cart.totalQuantity);

  const UserID = user?._id;

  // Fetch cart items

  useEffect(() => {
    if (!UserID) return;
    const fetchCartItems = async (UserID: string) => {
      try {
        const response = await api.getCartProduct(UserID);
        if (response.status === "success") {
          dispatch(fetchItems(response.data?.cartItemData || []));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartItems(UserID);
  }, [UserID, dispatch]);

  // Logout
  const logout = async () => {
    try {
      const response = await fetch(POST_USER_LOGOUT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.removeItem("persist");
        toast(responseData?.message);
        dispatch(removeAccessToken());
        redirect("/");
      } else {
        toast(responseData.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <header className="container header">
        <div className="container-center border-line mobile-header">
          <div
            className={`logo-container ${user?.accessToken ? "with-search" : ""}`}
          >
            <Link to="/">
              <h1 className="logo">
                Fork<span>ly</span>
              </h1>
            </Link>
          </div>
          {/* <div className="accessible-section"> */}
          {user?.accessToken && (
            <input
              className="search-input"
              type="text"
              placeholder="Search for Pizza..."
            />
          )}

          <div className="user-account">
            {!user?.accessToken ? (
              <Link to="/authentication" className="bold-link">
                Login / Register
              </Link>
            ) : (
              <>
                <div className="cart-container">
                  <div className="cart">
                    <Link to="/cart">
                      <FaShoppingCart className="cart-icon" />
                      <span className="item-count">{cartTotalItems}</span>
                    </Link>
                  </div>
                </div>

                <div className="dropdown">
                  <div className="user">
                    <FaUserCircle className="user-icon" />
                    <span className="user-name">{user?.name}</span>
                  </div>
                  <div className="dropdown-content">
                    <Link to="/account">Account</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="#" onClick={logout}>
                      Log Out
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* </div> */}
        </div>
      </header>

      <nav className="container">
        <div className="container-center">
          <Link className="bold-link" to="/restaurants">
            Restaurants
          </Link>
          <div>
            <Link className="prime-link" to="/">
              Home
            </Link>
            <Link className="prime-link" to="/shop">
              Shop
            </Link>
            <Link className="prime-link" to="/contact">
              Contact
            </Link>
          </div>
          <Link className="bold-link" to="tel:9870895374">
            Hotline: +91-9870895374
          </Link>
        </div>
      </nav>

      <ToastContainer />
    </>
  );
}
