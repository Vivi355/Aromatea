import React from "react"
import CreateProduct from "./CreateProduct"

const CreateForm = () => {
    const product = {
        name: '',
        description: '',
        primaryImg: '',
        secondaryImg: '',
        size: '',
        price: '',
        category: '',
    }

    return (
        <CreateProduct
            product={product}
            formType="Create Product"
        />
    )
}

export default CreateForm;
