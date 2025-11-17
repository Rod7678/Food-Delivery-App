import { useContext } from "react";
import { OrderContext } from "./MealContext";

export default function Meal({meals}){
    // console.log(meals);
    const {addMealCart}= useContext(OrderContext);
    return (
        <section >
            <ul id="meals">
                {meals.length === 0 && <p>no selected meal</p>}
                {meals.map((meal)=>(
                    <li key={meal.id} className="meal-item">
                        <img src={`http://localhost:3000/${meal.image}`} alt="unable to load" />
                        <div className="article">
                            <h3>{meal.name}</h3>
                            <p className="meal-item-price">${meal.price}</p>
                            <p className="meal-item-description">{meal.description}</p>
                            <button className="meal-item-actions button" onClick={()=>addMealCart(meal.id)}>Add to cart</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}