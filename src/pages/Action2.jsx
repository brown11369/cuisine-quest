import { useEffect, useState } from "react"
import Foodcard from "../components/Foodcard"
import Header from "../components/Header"

function Home() {

    let [food, setFood] = useState([])
    let [searched, setSearched] = useState("")
    let [showfood, setShowfood] = useState([])

    useEffect(() => {
        fetch("https://pms-api-food.herokuapp.com/products")
            .then((response) => response.json())
            .then((data) => {
                setFood(data)
                setShowfood(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function actionfood() {
        if (searched !== "") {
            setShowfood(food.filter((e) => {
                return e.ingredients.toLowerCase().includes(searched.toLowerCase()) || e.fname.toLowerCase().includes(searched.toLowerCase())
            }))
        }
        else {
            setShowfood(food)
        }

    }
    return (
        <>
            <Header findstring={setSearched} searchfood={actionfood} />
            <Foodcard data={showfood} />
        </>
    )
}
export default Home;