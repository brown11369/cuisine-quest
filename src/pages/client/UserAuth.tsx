import "./userauth.css";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { BiSolidHide, BiShowAlt } from "react-icons/bi";
import { addUserInfo } from "@/redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "@/services/api";
import { handleError } from "@/utils/handleError";

const UserAuth = () => {
  const [change, setChange] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // LOGIN input handler
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  // REGISTER input handler
  const regiInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  // LOGIN submit
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const responseData = await api.login(user);

      if (responseData.status === "success") {
        dispatch(addUserInfo(responseData.data?.credential));
        localStorage.setItem("persist", JSON.stringify(true));
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast(responseData.message || "Login failed");
      }
    } catch (error) {
      handleError(error, "Failed to login. Please try again.");
    }
  };

  // REGISTER submit
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.register(registerData);

      if (response.status === "success") {
        toast("You are registered!");
        setChange(true);
      } else {
        toast(response.message || "Registration failed");
      }
    } catch (error) {
      handleError(error, "Failed to register. Please try again.");
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

        {/* LOGIN FORM */}
        {change ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={inputHandler}
              className="login-input"
              placeholder="Enter your Email"
              required
            />

            <div className="password-visible-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={inputHandler}
                className="login-input"
                placeholder="Enter your Password"
                required
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
          // REGISTER FORM
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              onChange={regiInputHandler}
              value={registerData.name}
              className="register-input"
              placeholder="User Name"
              required
            />

            <input
              type="email"
              name="email"
              onChange={regiInputHandler}
              value={registerData.email}
              className="register-input"
              placeholder="Email"
              required
            />

            <input
              type="text"
              name="contact"
              onChange={regiInputHandler}
              value={registerData.contact}
              className="register-input"
              placeholder="Phone No."
              required
            />

            <input
              type="text"
              name="shippingAddress"
              onChange={regiInputHandler}
              value={registerData.shippingAddress}
              className="register-input"
              placeholder="Shipping Address"
              required
            />

            <div className="password-visible-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={registerData.password}
                onChange={regiInputHandler}
                className="register-input"
                placeholder="Enter your Password"
                required
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
