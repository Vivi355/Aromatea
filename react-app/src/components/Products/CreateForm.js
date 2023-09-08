import React from "react"
import CreateProduct from "./CreateProduct"

const CreateForm = () => {
    const product = {
        name: '',
        description: '',
        primaryImg: '',
        secondaryImg: '',
        variants: [{
            size: '',
            price: '',
        }],
        // size: '',
        // price: '',
        // variants: [],
    }

    return (
        <CreateProduct
            product={product}
            formType="Create Product"
        />
    )
}

export default CreateForm;
