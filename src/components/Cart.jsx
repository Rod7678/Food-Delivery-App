import { useContext, useEffect, useState } from "react"
import { OrderContext } from "./MealContext"




export default function Cart(){
    const [value, setValue] = useState(1);
    const [total, setTotal] = useState(0);
    const {meals} = useContext(OrderContext);

    const totalValue = meals.map((meal)=>parseInt(meal.price)).reduce((acc, curr) =>{return acc + curr},0);
    useEffect(()=>{
        setTotal(()=>{
            return totalValue;
        })
    },[totalValue])
    // console.log(totalValue);

    
    function handleAddingQuantity(){
        setValue((prevValue)=>prevValue = prevValue + 1)
    }
    function handleDecreasingQuantity(){
        setValue((prevValue)=>prevValue = prevValue - 1)
    }


    return (
        <div className="cart">
        <ul >
            {meals.map((meal)=>(
                <li key={meal.id} className="cart-item">
                        <p>{meal.name}-x{meal.price}</p>
                        <div className="cart-item-actions">
                            <button onClick={()=>handleDecreasingQuantity()}>-</button>
                            {value}
                            <button onClick={()=>handleAddingQuantity()}>+</button>
                        </div>
                </li>
            ))}
            <p className="cart-total">${total}</p>
        </ul>
        </div>
    )
}