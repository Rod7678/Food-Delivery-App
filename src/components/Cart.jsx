// Cart.jsx
import { useContext, useMemo } from "react";
import { OrderContext } from "./store/MealContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";

export default function Cart() {
  const { meals = [], updateMealQuantity } = useContext(OrderContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalValue = useMemo(() => {
    return meals.reduce((acc, meal) => {
      const price = Number.parseFloat(meal.price || 0) || 0;
      const qty = Number.isFinite(meal.quantity) ? meal.quantity : Number(meal.quantity) || 0;
      return acc + price * qty;
    }, 0);
  }, [meals]);

  const formattedTotalPrice = `$${totalValue.toFixed(2)}`;

  function handleCloseCart(){
    userProgressCtx.hideCart();
  }
  function handleCheckout(){
    userProgressCtx.showCheckOut();
  }

  if (!meals.length) return <div className="cart">Your cart is empty</div>;

  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {meals.map((meal) => {
          const price = Number.parseFloat(meal.price || 0) || 0;
          const formattedPrice = `$${price.toFixed(2)}`;

          return (
            <li key={meal.id} className="cart-item">
              <div>
                <p>
                  {meal.name} — {meal.quantity} × {formattedPrice}
                </p>
              </div>

              <div className="cart-item-actions">
                <button
                  onClick={() => updateMealQuantity(meal.id, -1)}
                  aria-label={`Remove one ${meal.name}`}
                >
                  -
                </button>

                <span>{meal.quantity}</span>

                <button
                  onClick={() => updateMealQuantity(meal.id, 1)}
                  aria-label={`Add one ${meal.name}`}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="cart-total">Total: {formattedTotalPrice}</p>
      <p className="modal-actions">
        <Button txtOnly={true} onClick={handleCloseCart}>Close</Button>
        <Button  onClick={handleCheckout}>Go To Checkout</Button>
      </p>
    </Modal>
  );
}
