import useFetch from "../hooks/useFetch.js";
import Error from "./Error.jsx";
import Meal from "./Meal.jsx";

const requestConfig = {}
export default function Products(){ 
    const {data: meals, isLoading, error} = useFetch('http://localhost:3000/meals', requestConfig , []);
    if(isLoading){
        return <p className="center">Fething meals</p>
    }
    
    if(error){
        return <Error title="Failed to Fetch meals" message={error}/>
    }
    return (
        <ul id="meals">
            {meals.map((meal)=>(
                <Meal meal={meal}/>
            ))}
        </ul>

    )
}