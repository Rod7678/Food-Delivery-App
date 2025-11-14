import { useState } from "react";
import Header from "./components/Header.jsx";
import { OrderContext } from "./components/MealContext.jsx";
import Products from "./components/Products.jsx";
import useFetch from "./hooks/useFetch.js";
import { fetchAvailableMeals } from "./http.js";

function App() {
  // const {fetchedData: userMeal, setFetchedData: setUserMeal} = useFetch(fetchAvailableMeals, [])

  const [userSelectedMeal, setUserSelectedMeal] = useState({
        items: [],
        customer: {
            email: '',
            name: '',
            street: '',
            city: ''
        }
    } )
      // console.log(userMeal)

  
      async function handleSelectMeal(selectedMeal) {
        
          setUserSelectedMeal((prevPickedMeal) => {
              if(!prevPickedMeal){
                  prevPickedMeal = {
        items: [],
        customer: {
            email: '',
            name: '',
            street: '',
            city: ''
        }
    };
              }
              const newMeal = {
                id: selectedMeal.id,
                name: selectedMeal.name,
                price: selectedMeal.price
              }
              return {
                ...prevPickedMeal,
                items: [newMeal, ...prevPickedMeal.items]
              }
          });
      }

      const ctxValue = {
        meals: userSelectedMeal.items,
        addingMeal :handleSelectMeal
      }
  return (
    <>
    <OrderContext.Provider value={ctxValue}>
      <Header />
      <Products onSelectMeal={handleSelectMeal}/>
    </OrderContext.Provider>
    </>
  );
}

export default App;
