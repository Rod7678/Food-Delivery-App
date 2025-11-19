import Header from "./components/Header.jsx";
import OrderContextProvider from "./components/MealContext.jsx";
import Products from "./components/Products.jsx";
function App() {

  // const [userSelectedMeal, setUserSelectedMeal] = useState({
  //       items: [],
  //       customer: {
  //           email: '',
  //           name: '',
  //           street: '',
  //           city: ''
  //       }
  //   } )
  return (
    <>
    <OrderContextProvider>
      <Header />
      <Products/>
    </OrderContextProvider>
    </>
  );
}

export default App;
