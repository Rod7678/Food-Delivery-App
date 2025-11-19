import { useContext } from "react";
import { OrderContext } from "./store/MealContext";
import Button from "./UI/Button";

export default function Meal({meal}){
    // console.log(meals);
    const {addMealCart}= useContext(OrderContext);
    return (
    <li key={meal.id} className="meal-item">
                        <article>
                            <img src={`http://localhost:3000/${meal.image}`} alt="unable to load" />
                            <div>
                                <h3>{meal.name}</h3>
                                <p className="meal-item-price">${meal.price}</p>
                                <p className="meal-item-description">{meal.description}</p>
                            </div>
                            <p className="meal-item-actions">
                                <Button onClick={()=>addMealCart(meal.id)}>Add to cart</Button>
                            </p>
                        </article>
                    </li>
                    )
}