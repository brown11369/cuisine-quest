import "./restaurants.css";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { IRestaurantDetails } from "@/types/restaurant";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurantDetails[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.getPublishedRestaurant();

        if (response.status === "success") {
          console.log("Restaurants Data:", response.data);
          setRestaurants(response.data.restaurants);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div className="restaurant-container">
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
