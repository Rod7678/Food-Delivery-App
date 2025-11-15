import { act, createContext } from "react";
import { fetchAvailableMeals } from "../http.js";
import useFetch from "../hooks/useFetch";

export const OrderContext= createContext({
    meals: [],
    addingMeal : ()=>{},
});


function mealCartReducer(state, action){
    const {fetchedData: meals} = useFetch(fetchAvailableMeals, [])
    if(action.type === "ADD_ORDER"){
        const updateMeals = [...state.items];

        const existingItemIndex = updateMeals.findIndex(
            (cartItem)=>cartItem.id === action.payload
        );
        const existingCartItem = updateMeals[existingItemIndex];
        if(existingCartItem){
            const updateMeal = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };
            updateMeals[existingItemIndex] = updateMeal;
        }else{
            const meal = meals.find((meal)=>meal.id === action.payload);
            updateMeals.push({
                id: action.payload,
                name: meal.name,
                price: meal.price,
                quantity: 1
            });
        }

        return {
            ...state,
            items: updateMeals
        };
    }

    if(action.type === "UPDATE_ORDER"){
        const updateMeals = [...state.items];
        const updateMealIndex = updateMeals.findIndex(
        (item)=>item.id === action.payload.productId
        );
        const updateMeal = {
            ...updateMeals[updateMealIndex]
        };


        updateMeal.quantity +=action.payload.amount;
        if(updateMeal.quantity <= 0){
            updateMeals.splice(updateMealIndex, 1);
        }else{
            updateMeals[updateMealIndex] = updateMeal;
        }

        return {
            ...state,
            items: updateMeals
        };
        
    }
}

export default function OrderContextProvider({children}){

}