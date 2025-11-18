import { useRef, useState } from "react";
import CartModal from "./CartModal.jsx";
import { useContext } from "react";
import { OrderContext } from "./MealContext.jsx";

export default function Header(){
    const modal = useRef();
    const [modalValue, setModalValue] = useState(false)
    const {meals} = useContext(OrderContext);
    function handleOpenCartClick(){
        modal.current.open();
    }
    function handleOpenCheckOut(){
        setModalValue(true);
        modal.current.open();
    }

    let cartQuantity = meals.length;

    let modalAction = <button>Close</button>;

    if(cartQuantity>0){
        modalAction = (
            <>
            <button className="text-button">Close</button>
            {!modalValue && <button className="text-button" onClick={()=>handleOpenCheckOut()}>Checkout</button>}
            {modalValue && <button className="text-button">Submit Order</button>}
            
            </>
        );
    }


    return (
        <>
        <CartModal 
        ref={modal}
        title="Your Cart"
        actions= {modalAction}
        modalValue = {modalValue}
        />
        <section id="main-header">
            <div id="title">
                <img src={"/logo.jpg"} alt="" />
                <h1>Rodfood</h1>
            </div>
            <button className="button" onClick={handleOpenCartClick}>Cart({cartQuantity})</button>
        </section>
        </>
    )
}