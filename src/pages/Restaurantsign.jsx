import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign.css";

import Menu from "../components/client/Header";
import Footer from "../components/client/Footer";


export default function Restaurantsign() {

    let Fromdata = {};

    let [change, setChange] = useState(1)

    const navigate = useNavigate()

    const login = async () => {
        const response = await fetch("https://shokumo-api.onrender.com/restaurant/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Fromdata)
        })
        const data = await response.json()
        console.log(data)
        if (data.success === true) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('restaurant', JSON.stringify(data))
            navigate("/dashboard/overview")
        }
        else {
            console.log(data)
        }


    }

    const logup = async () => {
        const response = await fetch("https://shokumo-api.onrender.com/restaurant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Fromdata)
        })
        const data = await response.json()
        console.log(data)
    }



    return (
        <>
        <Menu/>
            <section className="container-log">
            <div className="change-log"><button className="change-log-btn" onClick={() => {
                    setChange(1)
                }}>Restaurant Login</button><button className="change-log-reg" onClick={() => {
                    setChange(0)
                }}>Restaurant Registration</button></div>
                {change?<div className="login">
                    <input onChange={(e) => {
                        Fromdata.email = e.target.value;
                    }} className="textinput" placeholder="Email" type="text" />
                    <input onChange={(e) => {
                        Fromdata.password = e.target.value;
                    }} className="textinput" placeholder="Password" type="password" />
                    <button className="log-button" onClick={login}>Sign in</button>
                </div>:<div className="regin">
                    <input onChange={(e) => {
                        Fromdata.name = e.target.value;
                    }} className="textinput" placeholder="Restaurant Name" type="text" />
                    <input onChange={(e) => {
                        Fromdata.email = e.target.value;
                    }} className="textinput" placeholder="Email Address" type="text" />

                    <input onChange={(e) => {
                        Fromdata.mobile = e.target.value;
                    }} className="textinput" placeholder="Mobile No." type="text" />
                    <input onChange={(e) => {
                        Fromdata.address = e.target.value;
                    }} className="textinput" placeholder="Address" type="text" />
                    <input onChange={(e) => {
                        Fromdata.pin = e.target.value;
                    }} className="textinput" placeholder="Pincode" type="text" />
                    <input onChange={(e) => {
                        Fromdata.open = e.target.value;
                    }} className="textinput" placeholder="Opening Time" type="text" />
                    <input onChange={(e) => {
                        Fromdata.close = e.target.value;
                    }} className="textinput" placeholder="Closeing Time" type="text" />
                    <input onChange={(e) => {
                        Fromdata.image = e.target.value;
                    }} className="textinput" placeholder="Image Address" type="text" />
                    <input onChange={(e) => {
                        Fromdata.password = e.target.value;
                    }} className="textinput" placeholder="Password" type="password" />
                    <button className="log-button" onClick={logup}>Sign up</button>
                </div>}                
            </section>
            <Footer/>
        </>
    )

}