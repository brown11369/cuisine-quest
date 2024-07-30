import "./dashnav.css"

import { POST_RESTAURANT_LOGOUT } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../redux/slice/restaurantSlice"
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DashNav = () => {
    const redirect = useNavigate()
    const dispatch = useDispatch()

    const restaurantLogout = async () => {
        try {
            const fetchResponse = await fetch(POST_RESTAURANT_LOGOUT, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (fetchResponse.ok) {
                const responseData = await fetchResponse.json()
                dispatch(removeAccessToken())
                redirect("/restaurant/authentication")
            }
            else {
                const errorData = await fetchResponse.json();
                toast(errorData.message)
            }
        }
        catch (err) {
            toast("An error occurred while processing your request.")
        }
    }



    return (
        <div className="dashboard-navbar">
            <ul>
                <li><Link className="menu-item" to="overview" >Dashboard</Link></li>
                <li><Link className="menu-item" to="products" >Products</Link></li>
                <li><Link className="menu-item" to="orders" >Orders</Link></li>
                <li><Link className="menu-item" to="profile" >Profile</Link></li>
                <li><span className="menu-item" onClick={restaurantLogout}>Log Out</span></li>
            </ul>
            <ToastContainer />
        </div>
    )
}

export default DashNav;