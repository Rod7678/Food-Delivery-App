import { createContext, useMemo, useReducer, useState } from "react";
import useFetch from "../hooks/useFetch";
import { fetchAvailableMeals } from "../http";

export const OrderContext= createContext({
    meals: [],
    addMealCart : ()=>{},
    updateMealQuantity : ()=>{},
    orders: {
        items : [],
        customer: {
            email: '',
            name: '',
            street: '',
            city: ''
        }
    },
    submitData: ()=>{}
});


function mealCartReducer(state, action){
    switch(action.type){
        case "ADD_ORDER":{
            const { id, meal } = action.payload || {};
            if(!id || !meal) return state;
            
            const updateMeals = [...state.meals];
            const existingItemIndex = updateMeals.findIndex((m)=>m.id === id);

            if(existingItemIndex !== -1){
                const existing = {...updateMeals[existingItemIndex]};
                const qty = Number.isFinite(existing.quantity) ? existing.quantity : Number(existing.quantity) || 0;
                existing.quantity = qty + 1; 
                updateMeals[existingItemIndex]= existing
            }else{
                updateMeals.push({
                    id,
                    name: meal.name,
                    price: Number(meal.price) || 0,
                    quantity: 1
                });
            }
            return {
                ...state,
                meals: updateMeals
            };

        }

        case "UPDATE_ORDER":{
            const payload = action.payload || {};

            const productId = payload.productId;
            const amount = typeof payload.amount === "number" ? payload.amount : Number(payload.amount);

            if(!productId || !Number.isFinite(amount)){
                console.warn("UPDATE_ORDER ignored — invalid payload:", payload);
                return state;
            }
            const updateMeals = [...state.meals];
            const idx = updateMeals.findIndex((m)=>m.id === productId);

            if(idx === -1){
                console.warn("UPDATE_ORDER ignored — invalid payload:", payload);
                return state;
            }

            
            const updated = {...updateMeals[idx]};
            const currentQty = Number.isFinite(updated.quantity) ? updated.quantity : Number(updated.quantity) || 0;
            const newQty = currentQty + amount;
            if(newQty <= 0){
                updateMeals.splice(idx, 1);
            }else{
                updated.quantity = newQty;
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
    const [order, setOrder]= useState({
        items : [],
        customer: {
            email: '',
            name: '',
            street: '',
            postalCode: '',
            city: ''
        }})
    const [mealCartState, mealCartDispach] = useReducer(mealCartReducer, {
        meals: []
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
        mealCartDispach({
            type: "UPDATE_ORDER",
            payload: {
                productId,
                amount: Number(amount)
            }
        });
    }


    function handleCheckoutSubmit(customerDetails){
        setOrder((prevData)=>{
            return {
                ...prevData,
                items: mealCartState.meals,
                customer: {
                    email: customerDetails.email,
                    name: customerDetails.name,
                    street: customerDetails.street,
                    postalCode: customerDetails.postalCode,
                    city: customerDetails.city
                }
            }
        })
    }


    const ctxValue = useMemo(()=>({
        meals: mealCartState.meals,
        addMealCart: handleAddItemCart,
        updateMealQuantity: handleUpdateCartMealQuantity,
        orders: order,
        submitData: handleCheckoutSubmit
    }),[mealCartState.meals, meals]);

    return <OrderContext.Provider value={ctxValue}>
        {children}
    </OrderContext.Provider>


}