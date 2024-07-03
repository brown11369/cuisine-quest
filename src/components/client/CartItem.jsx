import './cartitem.css';
import { useState } from "react";
import { DELETE_CART_ITEM, POST_UPDATE_QUANTITY } from "../../utils/constants"
import { useDispatch } from 'react-redux';
import { increment } from "../../redux/slice/cartSlice"

const CartItem = ({ item }) => {
    let [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()


    const deleteItem = async (itemID) => {
        try {
            const response = await fetch(DELETE_CART_ITEM + itemID, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                const responseData = await response.json();
                // dispatch(addUserInfo(responseData?.userInfo))
            } else {
                const errorData = await response.json();
                toast(errorData.message)
            }
        } catch (error) {
            toast("An error occurred while processing your request.")
        }
    };

    const updateQuantity = async (itemID) => {
        console.log(itemID)
        // dispatch(increment({ itemID, foodID, quantity }))
        // try {
        //     const response = await fetch(POST_UPDATE_QUANTITY + itemID, {
        //         method: 'POST',
        //         credentials: 'include',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(itemData),
        //     });

        //     if (response.ok) {
        //         const responseData = await response.json();
        //         console.log(responseData)
        //         // dispatch(addUserInfo(responseData?.userInfo))
        //     } else {
        //         const errorData = await response.json();
        //         toast(errorData.message)
        //     }
        // } catch (error) {
        //     toast("An error occurred while processing your request.")
        // }
    }


    return (
        <tr className="food-item">
            <td>
                <img src={item?.product?.imageURL} alt="" className="food-image" />
            </td>
            <td className="food-name">{item?.product?.name}</td>
            <td className="quantity-container">
                <button onClick={() =>updateQuantity(false) } className="quantity-btn">-</button>
                {item?.quantity}
                <button onClick={() => updateQuantity(true)} className="quantity-btn">+</button>
                {/* <button onClick={() => dispatch(increment({ id: item?._id, quantity: quantity += 1 }))} className="quantity-btn">+</button> */}
            </td>
            <td className="food-price">{item?.product?.price * item?.quantity}</td>
            <td>
                <button onClick={() => deleteItem(item?._id)} className="remove-btn">Remove</button>
            </td>
        </tr>
    );
};

export default CartItem;
