import "./account.css";
import { useAppSelector } from "@/redux/hooks";

const Account = () => {
  const user = useAppSelector((store) => store.user.userInfo);
  console.log(user);
  return (
    <div className="user-profile">
      <img src="../media/img/user-profile.png" alt="User-Profile-Image" />
      <div className="user-details">
        <h6>{user.name}</h6>
        <p>Email: {user?.email}</p>
        {/* <p>Phone: {user?.contact}</p> */}
        {/* <p>Address: {user?.address}</p> */}
        {/* <p>Shipping Address: {user?.shippingAddress}</p> */}
        <button className="edit-btn">Edit Information</button>
      </div>
    </div>
  );
};

export default Account;
