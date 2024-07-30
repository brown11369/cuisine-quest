import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux"
import useAccess from "../../hooks/useAccess";


const RestaurantToolbar = () => {
    const restaurantInfo = useSelector(store => store.restaurant.restaurantInfo)
    useAccess("restaurant")
    return (
        <div className="toolbar">
            <span><FaUser /> {restaurantInfo?.name}</span>
            <span>User ID:{restaurantInfo?._id}</span>
            <span>User Email:{restaurantInfo?.email}</span>
        </div>
    )
}

export default RestaurantToolbar;