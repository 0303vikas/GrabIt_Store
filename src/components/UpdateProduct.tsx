import React, {useState} from 'react'
import { UpdateProductType } from '../types/UpdateProduct'

export const UpdateProduct = () => {
    return (
        <div>
            <input />{/* searchInput  */}
            <div>
                <img />
                <div>
                    <input value={10}/>
                    <input value={'desc'} />
                    <select>DropDown Category</select>
                    <select>DropDown Image</select>
                    </div>
            <div>
                <button>Update</button>
                <button>Delete</button>
            </div>
            </div>
            
        </div>
    )
}

const updateCard = (product: UpdateProductType) => {
    const [title,setTitle] = useState(product.update.title)
    const [description, setDescription] = useState(product.update.description)
    const [category, setCategory] = useState(product.update.category?.name)
    const [images, setImages] = useState(product.update.images)
    return(
        <div>
            
        </div>

    )
}

// title: string
//   price: number
//   description: string
//   category: CategoryType
//   images: string[]