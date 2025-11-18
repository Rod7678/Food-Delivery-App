import { useContext, useMemo } from "react";
import { OrderContext } from "./MealContext";

export default function CustomerCheckout() {
      const { meals = [] } = useContext(OrderContext);
    
      const totalValue = useMemo(() => {
        return meals.reduce((acc, meal) => {
          const price = Number.parseFloat(meal.price || 0) || 0;
          const qty = Number.isFinite(meal.quantity) ? meal.quantity : Number(meal.quantity) || 0;
          return acc + price * qty;
        }, 0);
      }, [meals]);
    
      const formattedTotalPrice = `$${totalValue.toFixed(2)}`;
    return (
        <div className="cart">
        <h2>Checkout</h2>
        <p>Total amount: {formattedTotalPrice}</p>
        <form>
            <div className="control">
                <label htmlFor="full-name">Full Name</label>
                <input type="text" name="full-name" id="full-name" required/>
            </div>
            <div className="control">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" required/>
            </div>
            <div className="control">
                <label htmlFor="street">Street</label>
                <input type="text" name="street" id="street" required/>
            </div>
            <div className="control-row">
                <div className="control">
                    <label htmlFor="street">postal code</label>
                    <input type="text" name="street" id="street" required/>
                </div>
                <div className="control">
                    <label htmlFor="street">City</label>
                    <input type="text" name="street" id="street" required/>
                </div>
            </div>
        </form>
        </div>
    )
}