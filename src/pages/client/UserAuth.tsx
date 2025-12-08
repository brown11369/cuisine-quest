import "./userauth.css";
import { useState, type ChangeEvent } from "react";
import { BiSolidHide, BiShowAlt } from "react-icons/bi";
import { addUserInfo } from "@/redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";

const UserAuth = () => {
  const [change, setChange] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    contact: "",
    shippingAddress: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const regiInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLogin = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log("api login response data");

    const responseData = await api.login(user);
    console.log("login response data", responseData);
    try {
      if (responseData.status === "success") {
        dispatch(addUserInfo(responseData?.data?.credential));
        await localStorage.setItem("persist", JSON.stringify(true));
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast(responseData.message);
      }
    } catch (error) {
      toast("An error occurred while processing your request.");
    }
  };

  const handleRegister = async () => {
    const response = await api.register(registerData);
    try {
      if (response.status === "success") {
        toast("You are registered...");
        setChange(true);
      } else {
        // const errorData = await response.json();
        // toast(errorData.message)
      }
    } catch (error) {
      toast("An error occurred while processing your request.");
    }
  };

  return (
    <section className="main-container">
      <div className="auth-container">
        <div>
          <button className="login-btn" onClick={() => setChange(true)}>
            Login
          </button>
          <button className="change-log-reg" onClick={() => setChange(false)}>
            Registration
          </button>
        </div>
        {change ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={inputHandler}
              className="login-input"
              placeholder="Enter your Email"
            />
            <div className="password-visible-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={inputHandler}
                className="login-input"
                placeholder="Enter your Password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BiSolidHide /> : <BiShowAlt />}
              </span>
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              onChange={regiInputHandler}
              value={registerData.name}
              className="register-input"
              placeholder="User Name"
            />
            <input
              type="text"
              name="email"
              onChange={regiInputHandler}
              value={registerData.email}
              className="register-input"
              placeholder="Email"
            />
            <input
              type="text"
              name="contact"
              onChange={regiInputHandler}
              value={registerData.contact}
              className="register-input"
              placeholder="Phone No."
            />
            <input
              type="text"
              name="shippingAddress"
              onChange={regiInputHandler}
              value={registerData.shippingAddress}
              className="register-input"
              placeholder="Shipping Address"
            />
            <div className="password-visible-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={registerData.password}
                onChange={regiInputHandler}
                className="register-input"
                placeholder="Enter your Password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BiSolidHide /> : <BiShowAlt />}
              </span>
            </div>
            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default UserAuth;
