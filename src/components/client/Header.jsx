import "./header.css"
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { GET_ALL_PUBLISHED_product, POST_USER_LOGOUT, GET_CART_ITEMS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slice/productSlice"
import { addItem } from "../../redux/slice/cartSlice"
import { removeAccessToken } from "../../redux/slice/userSlice"
import useAccess from "../../hooks/useAccess";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
    useAccess("user");
    const dispatch = useDispatch()
    const redirect = useNavigate()
    const user = useSelector(store => store.user.userInfo)
    const cartTotalItems = useSelector(store => store.cart.totalQuantity)

    const UserID = user?._id;

    useEffect(() => {
        fetch(GET_ALL_PUBLISHED_product)
            .then((response) => response.json())
            .then((fetchData) => {
                if (fetchData.success) {
                    dispatch(setProducts(fetchData.productData))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        (async () => {
            if (UserID) {
                try {
                    let totalItems = 0;
                    let totalPrice = 0;
                    // get all cart items
                    fetch(GET_CART_ITEMS + UserID)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then((fetchData) => {
                            fetchData?.cartItemData?.forEach(cart => {
                                totalItems += cart?.quantity;
                                totalPrice += cart?.quantity * cart?.product?.price;
                            });
                            dispatch(addItem({ cartData: fetchData?.cartItemData, totalItems, totalPrice }));
                        })
                        .catch((err) => {
                            console.error('Error fetching data:', err);
                        });
                } catch (error) {
                    console.error('Error in fetch operation:', error);
                }
            }
        })();
    }, [UserID])

    const logout = async () => {
        try {
            const response = await fetch(POST_USER_LOGOUT, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const responseData = await response.json()
                toast(responseData?.message)
                dispatch(removeAccessToken())
                redirect("/")
            }
            else {
                const errorData = await response.json();
                toast(errorData.message)
            }
        }
        catch (err) {
            toast("An error occurred while processing your request.")
        }

    }

    return (
        <>
            {/* <!-- ------- header section ------- --> */}
            <header className="container header">
                <div className="container-center border-line">
                    <div className="logo">
                        <Link to="/"><h1>Shokumo<span className="fury">fry</span></h1></Link>
                    </div>
                    <div className="search-box">
                        <input className="search-input" type="text" placeholder="Search Malai Tikka" />
                        <button className="btn search-btn">Search</button>
                    </div>
                    <div className="user-account">
                        {user?.accessToken == null ? <Link to="/authentication" className="bold-link">Login / Register</Link> : <>

                            <div className="cart-container">
                                <div className="cart">
                                    <Link to="/cart">
                                        <FaShoppingCart className="cart-icon" />
                                        <span className="item-count">{cartTotalItems}</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="dropdown">
                                <div className="user"><FaUserCircle className="user-icon" /><span className="user-name">{user?.name}</span></div>
                                <div className="dropdown-content">
                                    <Link to="/account">Account</Link>
                                    <Link to="/order">Order</Link>
                                    <Link onClick={logout}><i className="fas fa-sign-out"></i>Log Out</Link>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </header>

            {/* <!-- ------- navigation section ------- --> */}

            <nav className="container">
                <div className="container-center">
                    <Link className="bold-link" to="/restaurants">Restaurants</Link>
                    <div>
                        <Link className="prime-link" to="/">Home</Link>
                        <Link className="prime-link" to="/shop">Shop</Link>
                        <Link className="prime-link" to="/contact">Contact</Link>
                    </div>
                    <Link className="bold-link" to="tel:9870895374">Hotline: +91-9870895374</Link>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}