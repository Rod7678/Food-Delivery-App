import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http.js";
import Meal from "./Meal";
import useFetch from "../hooks/useFetch.js";


export default function Products({onSelectMeal}){
    const {fetchedData: meals} = useFetch(fetchAvailableMeals, [])
    // console.log(meals)    
    return (
        <>
        <Meal meals={meals} onSelectMeal={onSelectMeal}/>
        </>

    )
}