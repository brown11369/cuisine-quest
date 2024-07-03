import { Outlet ,Link,useNavigate} from "react-router-dom";

function Dashboard() {
    const navigat = useNavigate()

    function logout(){

            localStorage.removeItem('restaurant')
            localStorage.removeItem('token')
            navigat('/restaurant-sign')

    }


    return (
        <>
        <section className="dashboard">
                <div className="dashboard-menu">
                    <nav>
                        <Link className="dash-link" to="/dashboard/overview">Dashboard</Link>
                        <Link className="dash-link" to="/dashboard/add">Add</Link> 
                        <Link className="dash-link" to="/dashboard/action">Action</Link> 
                        <Link className="dash-link" to="/dashboard/user">User</Link>
                        <Link className="dash-link" to="/dashboard/order">Order</Link>
                        <span className="dash-link" onClick={logout}>Log Out</span>
                    </nav>
                </div>
                <Outlet/>

                

            </section>
        </>
    )
}

export default Dashboard;