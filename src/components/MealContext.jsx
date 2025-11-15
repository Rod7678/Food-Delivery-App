import { createContext } from "react";

export const OrderContext= createContext({
    meals: [],
    addingMeal : ()=>{},
    addingQuantity :()=>{},
    decreaseQuantity :()=>{}
});