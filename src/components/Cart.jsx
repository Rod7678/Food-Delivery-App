import { useContext } from "react"
import { OrderContext } from "./MealContext"




export default function Cart(){
    const {meals} = useContext(OrderContext);
    console.log(meals)
    return (
        <>
        <ul className="cart-total">
            {meals.map((meal)=>(
                <li key={meal.id} className="cart-item">
                        <p>{meal.name}</p>
                        <div className="cart-item-actions">
                            <button>-</button>
                            <button>+</button>
                        </div>
                </li>
            ))}
        </ul>
        </>
    )
}