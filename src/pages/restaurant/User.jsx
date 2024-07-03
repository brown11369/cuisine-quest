export default function Add() {
    const hotel = (JSON.parse(localStorage.getItem("restaurant")))

    return (
        <>
            <div className="layout">

                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                                <span className="font-weight-bold">{hotel.name}</span>
                                <span className="text-black-50">{hotel.email}</span>
                                <span className="text-black-50">{hotel.address} - {hotel.pin}</span>
                                <span className="text-black-50">{hotel.mobile}</span>
                                <span className="text-black-50">Timing: {hotel.open}-{hotel.close}</span>
                            </div>
                        </div>
                        <div className="col-md-5 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Restaurant Information</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12"><label className="labels">Restaurant Name</label><input type="text" className="form-control" placeholder="restaurant name" /></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels">Email Address</label><input type="text" className="form-control" placeholder="enter email id" /></div>
                                    <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" /></div>
                                    <div className="col-md-12"><label className="labels">Address</label><input type="text" className="form-control" placeholder="enter address" /></div>
                                    <div className="col-md-12"><label className="labels">Pincode</label><input type="text" className="form-control" placeholder="pincode" /></div>
                                    <div className="col-md-12"><label className="labels">Opening Time</label><input type="text" className="form-control" placeholder="opening time" /></div>
                                    <div className="col-md-12"><label className="labels">Closing Time</label><input type="text" className="form-control" placeholder="closing time" /></div>
                                    <div className="col-md-12"><label className="labels">Image</label><input type="text" className="form-control" placeholder="Image/URL" /></div>
                                </div>

                                {/* <div className="row mt-3">
                                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country"/></div>
                                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" placeholder="state" /></div>
                                </div> */}
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}