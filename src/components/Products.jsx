import Meal from "./Meal";
import useFetch from "../hooks/useFetch.js";
import { fetchAvailableMeals } from "../http.js";


export default function Products({onSelectMeal}){
    const {fetchedData: meals} = useFetch(fetchAvailableMeals, [])
    // const {meals} = useContext(OrderContext);
    console.log(meals)    
    return (
        <>
        <Meal meals={meals} onSelectMeal={onSelectMeal}/>
        </>

    )
}