import { useContext, useMemo, useRef } from "react";
import { OrderContext } from "./store/MealContext.jsx";
import Input from "./Input.jsx";
import { selectedOrders } from "../http.js";
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";

export default function CustomerCheckout() {
  const { meals = [], submitData, orders } = useContext(OrderContext);
  const userProgressCtx = useContext(UserProgressContext);
  const name = useRef();
  const email = useRef();
  const street = useRef();
  const postalCode = useRef();
  const city = useRef();
  const totalValue = useMemo(() => {
    return meals.reduce((acc, meal) => {
      const price = Number.parseFloat(meal.price || 0) || 0;
      const qty = Number.isFinite(meal.quantity) ? meal.quantity : Number(meal.quantity) || 0;
      return acc + price * qty;
    }, 0);
  }, [meals]);
    
  const formattedTotalPrice = `$${totalValue.toFixed(2)}`;
    
  function handleCloseCheckout(){
    userProgressCtx.hideCheckOut();
  }
  async function handleSubmitOrder(event){
      event.preventDefault();
      const enteredName = name.current.value;
      const enteredEmail = email.current.value;
      const enteredStreet = street.current.value;
      const enteredPostalCode = postalCode.current.value;
      const enteredCity = city.current.value;
      const order = {
          email: enteredEmail,
          name: enteredName,
          street: enteredStreet,
          postalCode: enteredPostalCode,
          city: enteredCity
      }
      console.log(orders)
      submitData(order)
      // try{
      //     await selectedOrders(orders)
      // }catch(error){
      //     console.log(error)
      //   }
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'checkout'}>
        <h2>Checkout</h2>
        <p>Total amount: {formattedTotalPrice}</p>
        <form onSubmit={handleSubmitOrder}>
            <Input 
            id={"full-name"} 
            label={"Full Name"} 
            name="full-name" 
            type="text"
            ref={name}
            required/>
            <Input 
            id={"email"} 
            label={"Email Address"} 
            name="email" 
            type="email" 
            ref={email}
            required/>
            <Input 
            id={"street"} 
            label={"Street"} 
            name="street" 
            type="text" 
            ref={street}
            required/>
            <div className="control-row">
                <Input 
                id={"postal-code"} 
                label={"postal code"} 
                name="postal-code" 
                type="number" 
                ref={postalCode}
                required/>
                <Input 
                id={"city"} 
                label={"City"} 
                name="city" 
                type="text" 
                ref={city}
                required />
            </div>
            <p className="form-actions">
              <Button txtOnly={true} onClick={handleCloseCheckout}>close</Button>
              <Button>Checkout</Button>
            </p>
        </form>
        </Modal>
    )

}