import { useEffect,useState } from "react"
export default function RestOrder(){

    const hotel = (JSON.parse(localStorage.getItem("restaurant")))

    const [order,setOrder]=useState(null)

    useEffect(() => {
        fetch(`https://shokumo-api.onrender.com/restaurant/orders/${hotel?.id}`)
            .then((response) => response.json())
            .then((data) => {
                setOrder(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
        
    }, [])


    return(
        <>
        <div className="layout">
            {
                order?.map((e,i)=>{
                    return(
                        <div key={i}>
                        <h1>{e?.foodid.name}</h1>
                        <h1>{e?.foodid.price}</h1>
                        <p>{e?.quantity}</p>
                        </div>
                    )
                })
            }
        </div>
        
        </>
    )

}
