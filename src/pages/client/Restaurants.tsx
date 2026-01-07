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
          setRestaurants(response.data.restaurants);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  if (!restaurants.length) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        No restaurants available.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
          >
            <div className="h-40 w-full overflow-hidden">
              <img
                src={restaurant.imageURL || "hotel1.jpg"}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {restaurant.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {restaurant.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Address:</span>{" "}
                {restaurant.address.street}, {restaurant.address.city},{" "}
                {restaurant.address.state}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Pin:</span>{" "}
                {restaurant.address.pin}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Hours:</span> {restaurant.open} -{" "}
                {restaurant.close}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
