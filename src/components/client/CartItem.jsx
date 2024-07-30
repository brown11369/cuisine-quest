import './cartitem.css';
import { useEffect, useState } from "react";
import { DELETE_CART_ITEM, POST_UPDATE_QUANTITY } from "../../utils/constants"
import { useDispatch, useSelector } from 'react-redux';
import { increment } from "../../redux/slice/cartSlice"

const CartItem = ({ item }) => {
    let [quantity, setQuantity] = useState(item?.quantity)
    const user = useSelector((store) => store.user.userInfo)

    const deleteItem = async (itemID) => {
        try {
            const response = await fetch(DELETE_CART_ITEM + itemID, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                // dispatch(addUserInfo(responseData?.userInfo))
            } else {
                const errorData = await response.json();
                console.log(errorData.message)
                // toast(errorData.message)
            }
        } catch (error) {
            console.log(error)
            // toast("An error occurred while processing your request.")
        }
    };

    const debounce = () => {
        return () => {
            setTimeout(() => {
                console.log(hello)
            }, 1000)
        }
    }

    useEffect(() => {
        let timerID = setTimeout(() => { updateQuantity }, 2000)
        return () => {
            clearTimeout(timerID)
        }
    }, [quantity])

    const updateQuantity = async (quantity) => {
        console.log(quantity)
        // setQuantity(quantity)

        // setQuantity(prev => prev <= 1 ? 1 : quantity - 1)
        // debounce(quantity)

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



    const debouncing = (fun, wait) => {
        let timerID
        return (...args) => {
            clearTimeout(timerID)
            timerID = setTimeout(() => fun(...args), wait)
        }
    }

    const callAPI = (quantity) => {
        console.log(quantity)
        setQuantity(quantity)
    }
    const debouncedCallApi = debouncing(callAPI, 500)

    return (
        <tr className="food-item">
            <td>
                <img src={item?.product?.imageURL} alt="" className="food-image" />
            </td>
            <td className="food-name">{item?.product?.name}</td>
            <td className="quantity-container">
                <button onClick={() => debouncedCallApi(quantity -= 1)} className="quantity-btn">-</button>
                {quantity}
                <button onClick={() => debouncedCallApi(quantity += 1)} className="quantity-btn">+</button>
            </td>
            <td className="food-price">{item?.product?.price * item?.quantity}</td>
            <td>
                <button onClick={() => deleteItem(item?._id)} className="remove-btn">Remove</button>
            </td>
        </tr>
    );
};

export default CartItem;
