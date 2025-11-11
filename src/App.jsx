import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import useFetch from "./hooks/useFetch.js";
import { fetchAvailableMeals, selectedOrders } from "./http.js";

function App() {
  const {fetchedData: userMeal, setFetchedData: setUserMeal} = useFetch(fetchAvailableMeals, [])
      console.log(userMeal)
  
      async function handleSelectMeal(selectedMeal) {
          setUserMeal((prevPickedMeal) => {
              if(!prevPickedMeal){
                  prevPickedMeal = [];
              }
              if(prevPickedMeal.includes((meal)=>meal.id === selectedMeal.id)){
                  return prevPickedMeal;
              }
              return [selectedMeal, ...prevPickedMeal]
          });

          try{
            await selectedOrders([selectedMeal, ...userMeal])
          }catch(error){
            setUserMeal(userMeal);
            console.log(error)
          }
      }

  return (
    <>
      <Header />
      <Products onSelectMeal={handleSelectMeal}/>
    </>
  );
}

export default App;
