import Meal from "./Meal.jsx";
import useFetch from "../hooks/useFetch.js";
import { fetchAvailableMeals } from "../http.js";

// const requestConfig = {}
export default function Products(){
    const {fetchedData: meals} = useFetch(fetchAvailableMeals, [])
//    const {fetchedData: meals, isFetching, error} = useFetch("http://localhost:3000/meals", requestConfig, []);

   console.log(meals)
//    if(isFetching){
//     return <p>Fetching meals</p>
//    } 
//    if(!meals){
//     return <p>No meals Found</p>
//    }
    return (
        <ul id="meals">
            {meals.map((meal)=>(
                <Meal meal={meal}/>
            ))}
        </ul>

    )
}