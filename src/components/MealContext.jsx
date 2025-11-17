import { createContext, useMemo, useReducer } from "react";
import useFetch from "../hooks/useFetch";
import { fetchAvailableMeals } from "../http";

export const OrderContext= createContext({
    meals: [],
    addMealCart : ()=>{},
    updateMealQuantity : ()=>{},
});


function mealCartReducer(state, action){
    switch(action.type){
        case "ADD_ORDER":{
            const { id, meal } = action.payload;
            if(!id || !meal) return state;
            
            const updateMeals = [...state.meals];
            const existingItemIndex = updateMeals.findIndex((m)=>m.id === id);

            if(existingItemIndex !== -1){
                const existing = updateMeals[existingItemIndex];
                updateMeals[existingItemIndex]= {...existing, quantity: existing.quantity +1}
            }else{
                updateMeals.push({
                    id,
                    name: meal.name,
                    price: meal.price,
                    quantity: 1
                });
            }
            return {
                ...state,
                meals: updateMeals
            };

        }

        case "UPDATE_ORDER":{
            const {productId, amount} = action.payload;
            const updateMeals = [...state.meals];
            const idx = updateMeals.findIndex((m)=>m.id === productId);

            if(idx !== -1) return state
            const updated = {...updateMeals[idx], quantity: updateMeals[idx].quantity + amount};
            if(updated.quantity <= 0){
                updateMeals.splice(idx, 1);
            }else{
                updateMeals[idx]=updated;
            }
            
            return {...state, meals: updateMeals};
        }

        default:
            return state;
    }
}

export default function OrderContextProvider({children}){
    const {fetchedData: meals} = useFetch(fetchAvailableMeals, []);
    const [mealCartState, mealCartDispach] = useReducer(mealCartReducer, {
        meals: [],
    })

    function handleAddItemCart(id){
        if(!id) return;
        const meal = meals.find((m)=>m.id === id);
        if(!meal){
            console.warn("Tried to add meal before meals were loaded or invalid id:", id);
            return;
        }
        mealCartDispach({
            type: "ADD_ORDER",
            payload:{
                id,
                meal
            }
        });
    }

    function handleUpdateCartMealQuantity(productId, amount){

        if(!productId || typeof amount !== "number") return;

        mealCartDispach({
            type: "UPDATE_ORDER",
            payload: {
                productId,
                amount
            }
        });
    }


    const ctxValue = useMemo(()=>({
        meals: mealCartState.meals,
        addMealCart: handleAddItemCart,
        updateMealQuantity: handleUpdateCartMealQuantity
    }),[mealCartState.meals, meals,]);

    return <OrderContext.Provider value={ctxValue}>
        {children}
    </OrderContext.Provider>


}