import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_RESTAURANT_PRODUCTS } from "../../utils/constants";
import { addRestaurantProducts } from "../../redux/slice/restaurantSlice";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit, FaCircle } from "react-icons/fa";

export default function Products() {
    const restaurant = useSelector((store) => store.restaurant.restaurantInfo)
    const products = useSelector((store) => store.restaurant.restaurantProducts)
    const restaurantID = restaurant?._id
    const dispatch = useDispatch()
    const redirect = useNavigate()

    console.log(products)

    useEffect(() => {
        (() => {
            fetch(GET_RESTAURANT_PRODUCTS + restaurantID)
                .then((response) => response.json())
                .then((fetchData) => {
                    if (fetchData.success) {
                        console.log("daya", fetchData?.productData)
                        dispatch(addRestaurantProducts(fetchData?.productData))
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })()
    }, [])

    const handleEdit = (itemID) => {
        redirect(`${redirectURL + itemID}`);
    };

    const deleteItem = async (itemID) => {
        let isDelete = window.confirm("Do you really want to delete this?");
        if (isDelete === true) {
            try {
                const response = await fetch(`${deleteURL + itemID}`, {
                    method: "DELETE",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // authorization: `Bearer ${adminInfo?.accessToken}`,
                    },
                });
                const responseData = await response.json();
                console.log(responseData);
            } catch (error) {
                console.error("Error deleting blog:", error);
            }
        } else {
            console.log("Delete canceled");
        }
    };

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
                {products && products?.map((product) => (
                    <tr >
                        <td>{product?.name}</td>
                        <td>{product?.price}</td>
                        <td>{product?.category}</td>
                        <td>{product?.keywords.join(",")}</td>
                        <td>
                            <span onClick={() => deleteItem()}><FaRegTrashAlt />Delete</span> |{" "}
                            <span onClick={() => handleEdit()}><FaRegEdit />Edit</span>
                        </td>
                        <td><FaCircle className={product?.status == "published" ? "status-published" : "status-draft"} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}