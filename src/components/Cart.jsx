import { useContext, useMemo} from "react"
import { OrderContext } from "./MealContext"




export default function Cart(){
    const {meals = [], updateMealQuantity} = useContext(OrderContext);
    
    const totalValue = useMemo(() => {
    return meals.reduce((acc, meal) => {
      const price = Number.parseFloat(meal.price || 0);
      const qty = Number.isFinite(meal.quantity) ? meal.quantity : 0;
      return acc + (isNaN(price) ? 0 : price * qty);
    }, 0);
  }, [meals]);
    const formatedTotalPrice = `$${totalValue.toFixed(2)}`;

    if (!meals.length) {
    return <div className="cart"><p>Your cart is empty.</p></div>;
   }


    return (
        <div className="cart">
        {meals.length > 0 && (
            <ul >
                {meals.map((meal)=>{
                    const price = Number.parseFloat(meal.price || 0);
                    const formatedPrice = `$${(isNaN(price) ? 0 : price).toFixed(2)}`
                    return (
                        <li key={meal.id} className="cart-item">
                            <div>
                                <p>{meal.name}-{meal.quantity}x{formatedPrice}</p>
                            </div>
                            <div className="cart-item-actions">
                                <button onClick={()=>updateMealQuantity(meal.id, -1)}>-</button>
                                {meal.quantity}
                                <button onClick={()=>updateMealQuantity(meal.id, 1)}>+</button>
                            </div>
                        </li>

                    )
                })}
            <p className="cart-total">{formatedTotalPrice}</p>
        </ul>
        )}
        </div>
    )
}