import { useRef } from "react";
import CartModal from "./CartModal.jsx";

export default function Header(){
    const modal = useRef();
    function handleOpenCartClick(){
        modal.current.open();
    }


    return (
        <>
        <CartModal 
        ref={modal}
        title="your cart"
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