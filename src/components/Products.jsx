import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http.js";
import Meal from "./Meal";
import useFetch from "../hooks/useFetch.js";


export default function Products(){
    // const [fetchedData, setFetchedData] = useState([]);
    const {fetchedData: meals} = useFetch(fetchAvailableMeals, [])
    // useEffect(()=>{
    //     async function fetchedMeals() {
    //         try {
    //             const meals =  await fetchAvailableMeals();
    //             setFetchedData(meals)
    //         }catch(error){
    //             console.log(error)
    //         }
    //     }

    //     fetchedMeals()
    // },[])
    console.log(meals)

    
    return (
        <>
        <Meal meals={meals}/>
        </>

    )
}