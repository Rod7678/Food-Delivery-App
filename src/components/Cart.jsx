import { useContext } from "react"
import { OrderContext } from "./MealContext"

export default function Cart(){
    const {meals} = useContext(OrderContext);
    console.log(meals)
    return (
        <>
        <h1 className="cart-total"></h1>
        </>
    )
}