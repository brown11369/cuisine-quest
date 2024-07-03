import "./userauth.css";
import { useState } from "react";
import { BiSolidHide, BiShowAlt } from "react-icons/bi";
import { POST_USER_LOGIN, POST_USER_REGISTER } from "../../utils/constants";
import { addUserInfo } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserAuth = () => {
    const [change, setChange] = useState(true)
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        contact: "",
        shippingAddress: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({ ...loginData, [name]: value })
    }


    const regiInputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterData({ ...registerData, [name]: value })
    }


    const handleLogin = async (event) => {
        event.preventDefault();      // Set loading message when form is submitted
        try {
            const response = await fetch(POST_USER_LOGIN, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const responseData = await response.json();
                dispatch(addUserInfo(responseData?.userInfo))
                await localStorage.setItem("persist", JSON.stringify(true));
                setLoginData({ email: "", password: "", })
                navigate("/");
            } else {
                const errorData = await response.json();
                toast(errorData.message)
            }
        } catch (error) {
            toast("An error occurred while processing your request.")
        }
    };


    const handleRegister = async (event) => {
        event.preventDefault();      // Set loading message when form is submitted
        try {
            const response = await fetch(POST_USER_REGISTER, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (response.ok) {
                const responseData = await response.json();
                toast("You are registered...")
                setChange(true)
            } else {
                const errorData = await response.json();
                toast(errorData.message)
            }
        } catch (error) {
            toast("An error occurred while processing your request.")
        }
    }



    return (
        <section className="main-container">
            <div className="auth-container">
                <div>
                    <button className="login-btn" onClick={() => setChange(true)}>Login</button>
                    <button className="change-log-reg" onClick={() => setChange(false)}>Registration</button>
                </div>
                {change ? (
                    <form onSubmit={handleLogin}>
                        <input type="email" name="email" value={loginData.email} onChange={inputHandler} className="login-input" placeholder="Enter your Email" />
                        <div className="password-visible-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={loginData.password}
                                onChange={inputHandler}
                                className="login-input"
                                placeholder="Enter your Password"
                            />
                            <span onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                            </span>
                        </div>
                        <button type="submit" className="submit-btn">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <input type="text" name="name" onChange={regiInputHandler} value={registerData.name} className="register-input" placeholder="User Name" />
                        <input type="text" name="email" onChange={regiInputHandler} value={registerData.email} className="register-input" placeholder="Email" />
                        <input type="text" name="contact" onChange={regiInputHandler} value={registerData.contact} className="register-input" placeholder="Phone No." />
                        <input type="text" name="shippingAddress" onChange={regiInputHandler} value={registerData.shippingAddress} className="register-input" placeholder="Shipping Address" />
                        <div className="password-visible-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
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
                        <button type="submit" className="submit-btn">Register</button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </section>
    )

}


export default UserAuth;
