import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addRestaurantProducts } from "@/redux/slice/restaurantSlice";
import { api } from "@/services/api";
import { FaRegTrashAlt, FaRegEdit, FaCircle } from "react-icons/fa";

export default function Products() {
  const { restaurantInfo, restaurantProducts } = useAppSelector(
    (store) => store.restaurant,
  );
  const restaurantID = restaurantInfo?._id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchRestaurantProducts = async (restaurantID: string) => {
      try {
        const response = await api.getRestaurantProducts(restaurantID);
        if (response.status === "success") {
          dispatch(addRestaurantProducts(response?.data.productData));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurantProducts(restaurantID);
  }, [dispatch, restaurantID]);

  return (
    <table className="blogTable">
      <thead>
        <tr>
          <th>Name</th>
          {<th>Price ⟨₹⟩</th>}
          {<th>Category</th>}
          <th>Keywords</th>
          <th>Actions</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {restaurantProducts &&
          restaurantProducts?.map((product) => (
            <tr>
              <td>{product?.name}</td>
              <td>{product?.price}</td>
              <td>{product?.category}</td>
              <td>{product?.keywords.join(",")}</td>
              <td>
                <span onClick={() => console.log("delete")}>
                  <FaRegTrashAlt />
                  Delete
                </span>{" "}
                |{" "}
                <span onClick={() => console.log("edit")}>
                  <FaRegEdit />
                  Edit
                </span>
              </td>
              <td>
                <FaCircle
                  className={
                    product?.status == "published"
                      ? "status-published"
                      : "status-draft"
                  }
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
