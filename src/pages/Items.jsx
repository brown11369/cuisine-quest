import React, { useContext } from "react";
import { CartContext } from "./Cart";

const Items = ({curItem}) => {
  const { removeItem, increment, decrement } = useContext(CartContext);

  const delItem = async (id) => {
    try {
        const response = await fetch(`https://shokumo-api.onrender.com/cart/remove/${id}`,{
            method:"DELETE"
        })
        const data = await response.json()
        removeItem(id)
    }
    catch (err) {
        console.log(err)
    }

}

  return (
    <div>
      <div  className="items-info">
        <div className="product-img">
          <img src={curItem?.foodid?.image} alt="iamge" />
        </div>

        <div className="title">
          <h2>{curItem?.foodid?.name}</h2>
        </div>

        <div className="add-minus-quantity">
          <i className="fas fa-minus minus" onClick={() => decrement(curItem?._id)}></i>
          <input type="text" placeholder={curItem?.quantity} disabled />
          {console.log(curItem._id)}
          <i className="fas fa-plus add" onClick={() => increment(curItem?._id)}></i>
        </div>

        <div className="price">
          <h3>{curItem?.foodid?.price*curItem?.quantity}₹</h3>
        </div>

        <div className="remove-item">
          <i
            className="fas fa-trash-alt remove"
            onClick={() => delItem(curItem?._id)
            }></i>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Items;
