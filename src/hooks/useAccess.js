import { addUserInfo } from "../redux/slice/userSlice";
import { POST_ACCESS_TOKEN } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const useAccess = (url) => {
    const dispatch = useDispatch()
    const redirect = useNavigate()

    // const user = useSelector(store => store.user.userInfo)
    // const UserID = user?._id;

    useEffect(() => {
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
                dispatch(addUserInfo(responseData?.userInfo))
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
    }, [dispatch])
}

export default useAccess;