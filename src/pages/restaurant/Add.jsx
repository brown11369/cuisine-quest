export default function Add() {

    const hotel = (JSON.parse(localStorage.getItem("restaurant")))
    let FoodData = { restaurant: hotel.id };

    const sendData = async () => {
        const response = await fetch("https://shokumo-api.onrender.com/food/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(FoodData)
        })
        const data = await response.json()
        console.log(data)
    }


    return (
        <>
            <div className="layout">

                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Add Your Recipe</h4>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels">Recipe</label><input onChange={(e) => {
                                        FoodData.name = e.target.value;
                                    }} type="text" className="form-control" placeholder="Recipe" /></div>
                                    <div className="col-md-12"><label className="labels">Price</label><input onChange={(e) => {
                                        FoodData.price = e.target.value;
                                    }} type="text" className="form-control" placeholder="Price" /></div>
                                    <div className="col-md-12"><label className="labels">Description</label><textarea onChange={(e) => {
                                        FoodData.description = e.target.value;
                                    }} className="form-control" placeholder="Description"></textarea></div>
                                    <div className="col-md-12"><label className="labels">Picture</label><input onChange={(e) => {
                                        FoodData.image = e.target.value;
                                    }} type="text" className="form-control" placeholder="Picture" /></div>
                                </div>
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={sendData}>Save Profile</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}