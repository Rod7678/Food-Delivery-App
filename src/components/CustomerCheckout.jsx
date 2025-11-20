import { useContext, useMemo } from "react";
import { OrderContext } from "./store/MealContext.jsx";
import Input from "./Input.jsx";
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import useFetch from "../hooks/useFetch.js";
import Error from "./Error.jsx";


const requestConfig = {
  method: 'POST',
  headers:{
    'Content-Type': 'application/json'
  }
}
export default function CustomerCheckout() {
  const { meals = [], clearCart } = useContext(OrderContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {data, isLoading: isSending, error, sendRequest, clearData} = useFetch('http://localhost:3000/orders', requestConfig);

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

  function handleFinished(){
    userProgressCtx.hideCheckOut();
    clearCart();
    clearData();
  } 

  function handleSubmitOrder(event){
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(JSON.stringify({
      order: {
        items: meals,
        customer: customerData,
      },
    }));

    }

    let actions = (
      <>
      <Button type="button" txtOnly={true} onClick={handleCloseCheckout}>close</Button>
      <Button>submit order</Button>
      </>
    );

    if(isSending){
      actions = <span>sending order data...</span>
    }

    if(data && !error){
      return <Modal open={userProgressCtx.progress === 'checkout'} onclose={handleCloseCheckout}>
        <h2>Success!</h2>
        <p>Your Order was submitted successfully.</p>
        <p>we will get back to you with more details via mail within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinished}>Okay</Button>
        </p>
      </Modal>
    }

    return (
      <Modal className="cart" open={userProgressCtx.progress === 'checkout'} onClose={onclose}>
        <form onSubmit={handleSubmitOrder}>
        <h2>Checkout</h2>
        <p>Total amount: {formattedTotalPrice}</p>
            <Input 
            id={"name"} 
            label={"Full Name"} 
            type="text"
            />
            <Input 
            id={"email"} 
            label={"Email Address"} 
            type="email" 
            />
            <Input 
            id={"street"} 
            label={"Street"}
            type="text" 
            />
            <div className="control-row">
                <Input 
                id={"postal-code"} 
                label={"postal code"} 
                type="number" 
                />
                <Input 
                id={"city"} 
                label={"City"} 
                type="text" 
                />
            </div>

            {error && <Error title="Failed to submit order" message={error}/>}
            <p className="modal-actions">
              {actions}
            </p>
        </form>
        </Modal>
    )

}