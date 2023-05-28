import { removeFromCart, updateCart} from "../redux/reducers/cartReducer"
import { ProductType } from "../types/Product"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useState } from "react"
import { CartType } from "../themes/CartType"

const CartKingItem = ({item} : {item: CartType}) => {
    const [numberOfItem, setNumberOfItem] = useState(item.quantity)
   
    const dispatch = useAppDispatch()
   
    return (
        <div>{item.title}
        <div>{item.description}</div>
        <button onClick={() => setNumberOfItem(numberOfItem + 1)}>+</button>
        <div>{numberOfItem}</div>
        <button onClick={() => numberOfItem===1?null: setNumberOfItem(numberOfItem-1)}>-</button>
       
        <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        <button onClick={() => dispatch(updateCart({id: item.id,quantity: numberOfItem}))}>Update</button>


        </div>
        
    )
}

export default CartKingItem