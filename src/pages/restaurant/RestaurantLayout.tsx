import "./restaurantlayout.css";
import { Outlet } from "react-router-dom";
import DashNav from "../../components/restaurant/DashNav";
import RestaurantToolbar from "../../components/restaurant/RestaurantToolbar";

const RestaurntLayout = () => {
  return (
    <>
      <RestaurantToolbar />
      <div className="panel">
        <DashNav />
        <div className="panel-pages">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RestaurntLayout;
