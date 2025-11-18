import { useContext, useMemo } from "react";
import { OrderContext } from "./MealContext";
import Input from "./Input.jsx";
import { useInput } from "../hooks/useFetch.js";

export default function CustomerCheckout() {
     const {enteredValue: nameValue,
    handleInputChanges: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameIsValid
  } = useInput('');
     const {enteredValue: emailValue,
    handleInputChanges: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailIsValid
  } = useInput('');
     const {enteredValue: streetValue,
    handleInputChanges: handleStreetChange,
    handleInputBlur: handleStreetBlur,
    hasError: streetIsValid
  } = useInput('');
     const {enteredValue: postalValue,
    handleInputChanges: handlePostalChange,
    handleInputBlur: handlePostalBlur,
    hasError: postalIsValid
  } = useInput('');
     const {enteredValue: cityValue,
    handleInputChanges: handleCityChange,
    handleInputBlur: handleCityBlur,
    hasError: cityIsValid
  } = useInput('');

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
            <Input 
            id={"full-name"} 
            label={"Full Name"} 
            name="full-name" 
            type="text"
            onBlur={handleNameBlur} 
            onChange={handleNameChange} 
            value={nameValue} 
            error={nameIsValid && 'please enter valid email'}
            required/>
            <Input 
            id={"email"} 
            label={"Email Address"} 
            name="email" 
            type="email" 
            onBlur={handleEmailBlur} 
            onChange={handleEmailChange} 
            value={emailValue}
            error={emailIsValid && 'please enter valid email'} 
            required/>
            <Input 
            id={"street"} 
            label={"Street"} 
            name="street" 
            type="text" 
            onBlur={handleStreetBlur} 
            onChange={handleStreetChange} 
            value={streetValue} 
            error={streetIsValid && 'please enter valid email'}
            required/>
            <div className="control-row">
                <Input 
                id={"postal-code"} 
                label={"postal code"} 
                name="postal-code" 
                type="number" 
                onBlur={handlePostalBlur} 
                onChange={handlePostalChange} 
                value={postalValue} 
                error={postalIsValid && 'please enter valid email'}
                required/>
                <Input 
                id={"city"} 
                label={"City"} 
                name="city" 
                type="text" 
                onBlur={handleCityBlur} 
                onChange={handleCityChange} 
                value={cityValue} 
                error={cityIsValid && 'please enter valid email'}
                required />
            </div>
        </form>
        </div>
    )
}