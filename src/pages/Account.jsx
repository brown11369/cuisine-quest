import Menu from "../components/client/Header";
import Footer from "../components/client/Footer";
import "./account.css"
export default function Account() {

    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user)


    return (
        <>
            <Menu />
            <div className="row container-address d-flex justify-content-center">
                <div className="col-xl-6 col-md-12">
                    <div className="card user-card-full">
                        <div className="row m-l-0 m-r-0">
                            <div className="col-sm-4 bg-c-lite-green user-profile">
                                <div className="card-block text-center text-white">
                                    <div className="m-b-25">
                                        <img src="../media/img/user-profile.png" className="img-radius" alt="User-Profile-Image" />
                                    </div>
                                    <h6 className="f-w-600">{user.name}</h6>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="card-block">
                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="m-b-10 f-w-600">Email</p>
                                            <h6 className="text-muted f-w-400">{user?.email}</h6>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="m-b-10 f-w-600">Phone</p>
                                            <h6 className="text-muted f-w-400">{user?.contact}</h6>
                                        </div>
                                        {/* <div className=".col-sm-6">
                                                    <p className="m-b-10 f-w-600">Age</p>
                                                    <h6 className="text-muted f-w-400">{user?.age}</h6>
                                                </div> */}
                                    </div>
                                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Address</h6>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Address</p>
                                            <h6 className="text-muted f-w-400">{user?.address}</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Shipping Address</p>
                                            <h6 className="text-muted f-w-400">{user?.shipaddress}</h6>
                                        </div>

                                    </div>
                                    <ul className="social-link list-unstyled m-t-40 m-b-10">
                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}