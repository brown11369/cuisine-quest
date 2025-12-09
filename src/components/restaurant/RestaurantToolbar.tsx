import { FaUser } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks";

const RestaurantToolbar = () => {
  const restaurantInfo = useAppSelector(
    (store) => store.restaurant.restaurantInfo,
  );
  return (
    <div className="toolbar">
      <span>
        <FaUser /> {restaurantInfo?.name}
      </span>
      <span>User ID:{restaurantInfo?._id}</span>
      <span>User Email:{restaurantInfo?.email}</span>
    </div>
  );
};

export default RestaurantToolbar;
