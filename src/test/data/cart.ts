import { ProductType } from "../../types/Product";
import { category1, category2, category3 } from "./categories";


const cart1: (ProductType & {quantity: number}) = {
    id: 1,
    title: 'Cart1',
    price: 10,
    description: '',
    category: category1,
    images: [''],
    quantity: 1
}

const cart2: (ProductType & {quantity: number}) = {
    id: 2,
    title: 'Cart1',
    price: 10,
    description: '',
    category: category2,
    images: [''],
    quantity: 1
}

const cart3: (ProductType & {quantity: number}) = {
    id: 3,
    title: 'Cart1',
    price: 10,
    description: '',
    category: category3,
    images: [''],
    quantity: 1
}

const updateCartData:{ id: number; quantity: number} = {
    id: 1,
    quantity: 3
}

const cartStore = [cart1,cart2,cart3]
export{cart1,cart2,cart3, updateCartData}

export default cartStore