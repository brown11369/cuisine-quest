import { useState, useEffect, useRef } from 'react'

function Products() {

    const hotel = (JSON.parse(localStorage.getItem("restaurant")))

    let [food, setFood] = useState([])
    let [upop, setUpop] = useState(false)

    let setupdate = useRef({})


    useEffect(() => {
        fetch("https://shokumo-api.onrender.com/food/restaurant/" + hotel.id)
            .then((response) => response.json())
            .then((data) => {
                setFood(data)
                console.log(food)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function delitem(id) {
        fetch(`https://shokumo-api.onrender.com/food/${id}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => {

                if (data.success === true) {
                    let newprod = [...food]
                    let delfood = newprod.findIndex((ele) => {
                        return Number(id) === Number(ele._id)
                    })
                    newprod.splice(delfood, 1)
                    setFood(newprod);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function readvalue(poperty, value) {
        setupdate.current[poperty] = value
    }

    function updatefood(id) {
        fetch(`https://shokumo-api.onrender.com/food/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(setupdate.current)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success === true) {
                    setUpop(false)
                }
                else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const submitHandler = (event) => {
        event.preventDefault();
    }


    return (
        <>
            {upop && <div className=" d-flex h-100 container-fluid position-fixed justify-content-center top-0 start-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                <div className="align-self-center w-75">
                    <div className="card p-2">
                        <div className=" d-flex flex-row-reverse">
                            <i className="fa-regular fa-circle-xmark text-danger h4" onClick={() => {
                                setUpop(false)
                            }}></i>
                        </div>
                        <form className='form-container' onSubmit={submitHandler}>
                            <input type="text" defaultValue={setupdate.current.name} placeholder='Name' className='form-control mb-2' onChange={(e) => {
                                readvalue("name", e.target.value)
                            }} required />
                            <input type="text" defaultValue={setupdate.current.price} placeholder='Price' className='form-control mb-2' onChange={(e) => {
                                readvalue("price", e.target.value)
                            }} required />
                            <input type="text" defaultValue={setupdate.current.description} placeholder='Description' className='form-control mb-2' onChange={(e) => {
                                readvalue("description", e.target.value)
                            }} required />
                            <input type="text" defaultValue={setupdate.current.image} placeholder="Image Link" className='form-control mb-2' onChange={(e) => {
                                readvalue("image", e.target.value)
                            }} required />
                            <button className="btn btn-primary bg-success" type="submit" onClick={() => {
                                updatefood(setupdate.current._id)
                            }}>Update Food</button>
                        </form>

                    </div>
                </div>
            </div>}

            <div className='container flex-column'>
                <h1 className='title'>Food Items</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            food.map((ele, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{1 + index}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.price}</td>
                                        <td><p onClick={() => {
                                            setupdate.current = ele
                                            setUpop(true)
                                        }}>Edit</p></td>
                                        <td><p style={{ cursor: "pointer", fontWeight: "500" }} onClick={() => {
                                            let result = confirm("Are You Sure... Want to delete this?");
                                            if (result) {
                                                delitem(ele._id)
                                            }
                                        }}>Delete</p></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>

            </div>

        </>
    )

}



export default Products;