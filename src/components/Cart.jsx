import { useContext, useState } from "react"
import { OrderContext } from "./MealContext"




export default function Cart(){

    const [value, setValue] = useState(1);
    const {meals} = useContext(OrderContext);
    let cartQuantity = meals.length;
    console.log(cartQuantity);
    // if(cartQuantity>0){
    //     setValue(1)
    // }

    function handleAddingQuantity(){
        setValue((prevValue)=>prevValue = prevValue + 1)
    }
    function handleDecreasingQuantity(){
        setValue((prevValue)=>prevValue = prevValue - 1)
    }

    console.log(meals);
    return (
        <>
        <ul className="cart-total">
            {meals.map((meal)=>(
                <li key={meal.id} className="cart-item">
                        <p>{meal.name}</p>
                        <div className="cart-item-actions">
                            <button onClick={()=>handleDecreasingQuantity()}>-</button>
                            {value}
                            <button onClick={()=>handleAddingQuantity()}>+</button>
                        </div>
                </li>
            ))}
        </ul>
        </>
    )
}