import { useContext } from "react";
import { OrderContext } from "./store/MealContext.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";

export default function Header(){
    const {meals} = useContext(OrderContext);
    const userProgressCtx = useContext(UserProgressContext);
    function handleOpenCart(){
        userProgressCtx.showCart()
    }

    
    let cartQuantity = meals.reduce((totalNumberOfItems, meal)=>{
        return totalNumberOfItems + meal.quantity;
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={"/logo.jpg"} alt="Site Logo" />
                <h1>Rodfood</h1>
            </div>
            <nav>
            <Button txtOnly={true} onClick={handleOpenCart}>Cart({cartQuantity})</Button>
            </nav>
        </header>
    )
}