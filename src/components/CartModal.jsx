import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import Cart from "./Cart";
import CustomerCheckout from "./CustomerCheckout.jsx";

const CartModal = forwardRef(function Modal({title, actions, modalValue},ref){
    const dialog = useRef()
    useImperativeHandle(ref, ()=>{
        return {
            open: ()=>{
                dialog.current.showModal()
            },
            close: ()=>{
                dialog.current.close();
            }
        }
    })
    console.log(modalValue)

    return createPortal(
        <dialog id="cart" ref={dialog}>
            <h2>{title}</h2>
            {!modalValue && <Cart actions={actions}/>}
            {modalValue && 
            <CustomerCheckout/>
            }
            {modalValue && 
            <form method="dialog" id="modal-actions" className="cart-total">
                {actions}
            </form>}
        </dialog>,
        document.getElementById("modal")
    );
});


export default CartModal;