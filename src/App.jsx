import Header from "./components/Header.jsx";
import OrderContextProvider from "./components/store/MealContext.jsx";
import Products from "./components/Products.jsx";
import { UserProgressContextProvider } from "./components/store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import CustomerCheckout from "./components/CustomerCheckout.jsx";
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
    <UserProgressContextProvider>
    <OrderContextProvider>
      <Header />
      <Products/>
      <Cart />
      <CustomerCheckout />
    </OrderContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
