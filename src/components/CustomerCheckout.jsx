import { useContext, useMemo } from "react";
import { OrderContext } from "./store/MealContext.jsx";
import Input from "./Input.jsx";
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";

export default function CustomerCheckout() {
  const { meals = [] } = useContext(OrderContext);
  const userProgressCtx = useContext(UserProgressContext);

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
  function handleSubmitOrder(event){
      event.preventDefault();

      const fd = new FormData(event.target);
      const customerData = Object.fromEntries(fd.entries());

      fetch('http://localhost:3000/orders',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order: {
            items: meals,
            customer: customerData
          }
        }),
    });
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
            <p className="modal-actions">
              <Button type="button" txtOnly={true} onClick={handleCloseCheckout}>close</Button>
              <Button>submit order</Button>
            </p>
        </form>
        </Modal>
    )

}