import React, {useState} from "react"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { removeFromCart, updateCart} from "../redux/reducers/cartReducer"

const CartKing = () => {
    const cartState = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    

    return (
        <div>
            {cartState.length?(cartState.map((item,index) => {
                // let countItem = item.quantity
                // const incCountItem = (e: number) => {
                //     countItem

                // }
                // const decCountItem = (e: number) => {

                // }
                return (
                    <div>{item.title}
                    <div>{item.description}</div>
                    {/* <button onChange={() => countItem++}>+</button>
                    <div>{countItem}</div>
                    <button onChange={() => countItem--}>-</button> */}
                   
                    <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                    {/* <button onClick={() => dispatch(updateCart({id: item.id,quantity: countItem}))}>Update</button> */}


                    </div>
                    
                )
            })):(<div> No Item added to Cart
            </div>)}

        </div>
    )
}

export default CartKing