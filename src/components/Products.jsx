import Meal from "./Meal.jsx";
import useFetch from "../hooks/useFetch.js";
import { fetchAvailableMeals } from "../http.js";


export default function Products(){
    const {fetchedData: meals} = useFetch(fetchAvailableMeals, [])
    // console.log(meals)    
    return (
        <ul id="meals">
            {meals.length === 0 && <p>no selected meal</p>}
            {meals.map((meal)=>(
                <Meal meal={meal}/>
            ))}
        </ul>

    )
}