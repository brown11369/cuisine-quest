import { Navigate } from "react-router-dom";

function Restrict(props) {

    let data = localStorage.getItem('token')

    return (
        data===null?<Navigate to='/'/>:props.children
    )

}


export default Restrict;