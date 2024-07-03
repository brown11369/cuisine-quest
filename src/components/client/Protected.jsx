import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const userInfo = useSelector(store => store.user.userInfo)
    const persist = JSON.parse(localStorage.getItem("persist"))

    if (!persist && !userInfo?.accessToken) return <Navigate to="/" />

    if (persist || userInfo?.accessToken) return children
}

export default Protected;