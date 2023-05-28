import React, {useState} from "react"

import { useAppSelector } from "../hooks/useAppSelector"
import CartKingItem from "./CartItem"

const CartKing = () => {
    const cartState = useAppSelector(state => state.cart)
    

    

    return (
        <div>
            {cartState.length?(cartState.map((item,index) => <CartKingItem item={item}/>
            )):(<div> No Item added to Cart
            </div>)}

        </div>
    )
}



export default CartKing