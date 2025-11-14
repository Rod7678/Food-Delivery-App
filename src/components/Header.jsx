import { useRef } from "react";
import CartModal from "./CartModal.jsx";
import { useContext } from "react";
import { OrderContext } from "./MealContext.jsx";

export default function Header(){
    const modal = useRef();
    const {meals} = useContext(OrderContext);
    function handleOpenCartClick(){
        modal.current.open();
    }

    let cartQuantity = meals.length;

    let modalAction = <button>Close</button>;

    if(cartQuantity>0){
        modalAction = (
            <>
            <button className="text-button">Close</button>
            <button className="text-button">Checkout</button>
            </>
        );
    }


    return (
        <>
        <CartModal 
        ref={modal}
        title="Your Cart"
        actions= {modalAction}
        />
        <section id="main-header">
            <div id="title">
                <img src={"/logo.jpg"} alt="" />
                <h1>Rodfood</h1>
            </div>
            <button className="button" onClick={handleOpenCartClick}>Cart</button>
        </section>
        </>
    )
}