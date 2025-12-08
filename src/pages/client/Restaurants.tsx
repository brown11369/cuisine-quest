import { useEffect, useState } from "react";
import { GET_ALL_RESTAURANT } from "../../utils/constants";
import "./restaurants.css";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(GET_ALL_RESTAURANT);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchData = await response.json();

        if (fetchData.success) {
          setRestaurants(fetchData?.restaurants);
        } else {
          throw new Error("Request failed with error: " + data?.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div className="restaurant-container">
      {/* <h1>All Restaurants</h1> */}
      {restaurants.map((restaurant, index) => {
        return (
          <div className="card" key={index}>
            <img src="hotel1.jpg" alt="Hotel 1" />
            <div className="card-details">
              <h2>{restaurant.name}</h2>
              <p>Email: {restaurant.email}</p>
              <p>
                Address: {restaurant.address.street} {restaurant.address.city}{" "}
                {restaurant.address.state}
              </p>
              <p>Pin: {restaurant.address.pin}</p>
              <p>Opening Hours: {restaurant.open}</p>
              <p>Closing Hours: {restaurant.close}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Restaurants;
