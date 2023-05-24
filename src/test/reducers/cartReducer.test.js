
import {addToCart,removeFromCart,updateCart, clearCart} from '../../redux/reducers/cartReducer'
import cartStore, {cart1,cart2, cart3, updateCartData } from '../data/cart'
import store from '../shared/store'

afterEach(() => {
    store.dispatch(clearCart())

})

describe('Cart State Testing', () => {
    test('Checking initial State', () => {
        expect(store.getState().cart).toEqual([])
    })
    test('Add to Cart', () => {
        store.dispatch(addToCart(cart1))
        store.dispatch(addToCart(cart2))
        store.dispatch(addToCart(cart3))        
        expect(store.getState().cart.length).toBe(3)
    })
    test('Update Cart', () => {
        store.dispatch(addToCart(cart1))
        store.dispatch(addToCart(cart2))
        store.dispatch(addToCart(cart3))  
        store.dispatch(updateCart(updateCartData))
        
        expect(store.getState().cart[updateCartData.id-1].quantity).toEqual(updateCartData.quantity)
    })
    test('Check for duplicate products', () => {
        store.dispatch(addToCart(cart1))
        store.dispatch(addToCart(cart1))
        
        expect(store.getState().cart.length).toBe(1)

    })
    test('remove from Cart', () => {
        store.dispatch(addToCart(cart1))
        store.dispatch(addToCart(cart2))
        store.dispatch(removeFromCart(2))
        
        expect(store.getState().cart.length).toBe(1)
    })
})