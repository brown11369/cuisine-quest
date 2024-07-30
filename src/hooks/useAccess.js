import { addUserInfo } from "../redux/slice/userSlice";
import { POST_ACCESS_TOKEN } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addRestaurantInfo } from "../redux/slice/restaurantSlice";

const useAccess = (url) => {
    const dispatch = useDispatch();
    const redirect = useNavigate();

    const persist = localStorage.getItem("persist");

    useEffect(() => {
        if (persist) {
            (async () => {
                const response = await fetch(`${POST_ACCESS_TOKEN + url}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    const responseData = await response.json()
                    if (url === "user") {
                        dispatch(addUserInfo(responseData?.credential))
                    }
                    else if (url === "restaurant") {
                        dispatch(addRestaurantInfo(responseData?.credential))
                    }
                }
                else if (response.status == 403) {
                    redirect("/");
                }
                else if (response.status == 401) {
                    redirect("/");
                }
                else {
                    redirect("/");
                }
            })()
        }
    }, [dispatch])
}

export default useAccess;