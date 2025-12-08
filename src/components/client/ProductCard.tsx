import "./productcard.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { POST_ADD_ITEM } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { pushToCart } from "../../redux/slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";

function ProductCard({ product }) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const user = useAppSelector((store) => store.user.userInfo);
  const cartData = { user: user?._id };

  const addToCart = async (productID) => {
    cartData.product = productID;
    if (!user?.accessToken) return navigate("/authentication");

    try {
      const response = await fetch(POST_ADD_ITEM, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        const fetchData = await response.json();

        if (fetchData.data) {
          const cartItemData = {
            _id: fetchData?.data?._id,
            user: user?._id,
            product: product,
            quantity: 1,
          };
          dispatch(pushToCart(cartItemData));
        }
      } else {
        const errorData = await response.json();
        toast(errorData.message);
      }
    } catch (error) {
      console.log(error);
      toast("An error occurred while processing your request.");
    }
  };

  return (
    <div className="ProductCardContainer">
      <img
        src={product?.imageURL}
        className="card-img-top img-fluid"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{product?.name}</h5>
        <span className="card-price">₹ {product?.price}</span>
        <div className="row">
          <button
            className="btn btn-primary btn-add-to-cart"
            onClick={() => addToCart(product?._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductCard;
