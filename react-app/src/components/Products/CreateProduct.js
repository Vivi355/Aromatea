import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import "./CreateProduct.css"
import { thunkCreateProduct, thunkUpdateProduct } from "../../store/products";

function CreateProduct({ product, formType }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState(product ? product.name : '')
    const [description, setDescription] = useState(product ? product.description : '')
    const [primaryImg, setPrimaryImg] = useState(product ? product.primaryImg : '')
    const [secondaryImg, setSecondaryImg] = useState(product ? product.secondaryImg : '')
    const [price, setPrice] = useState("")

    const SIZES_ENUM = {
        ONE_POUND: "1 Pound",
        QUARTER_POUND: "1/4 Pound"
    }
    // const [size, setSize] = useState(Object.values(SIZES_ENUM))
    const [selectSize, setSelectSize] = useState("")

    const CATEGORIES_ENUM = {
    BLACK: "BLACK",
    GREEN: "GREEN",
    WHITE: "WHITE",
    BOTANICAL: "BOTANICAL",
    OOLONG: "OOLONG"
    };
    const [categories, setCategories] = useState(Object.values(CATEGORIES_ENUM))
    const [selectCategory, setSelectCategory] = useState("")

    const [errors, setErrors] = useState({});


    useEffect(() => {
        const errors = {}
        if (name && name.length < 3) errors.name = "Name is required"
        if (description && description.length < 5) errors.description = "Description must have 5 or more characters"
        if (primaryImg && !primaryImg.endsWith('.png') && !primaryImg.endsWith('.jpg') && !primaryImg.endsWith('.jpeg')) {
            errors.primaryImg = 'Image URL must end with .png, .jpg, or .jpeg';
          }
        if (secondaryImg && !secondaryImg.endsWith('.png') && !secondaryImg.endsWith('.jpg') && !secondaryImg.endsWith('.jpeg')) {
            errors.secondaryImg = 'Image URL must end with .png, .jpg, or .jpeg';
          }

          if (!price || isNaN(price) || price < 1) errors.price = "Price must be greater than 0";


        setErrors(errors)
    }, [name, description, primaryImg, secondaryImg, price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            primary_img: primaryImg,
            secondary_img: secondaryImg,
            size: selectSize,
            price,
            category: selectCategory,
        }


        let updateProduct;
        if (formType === "Create Product") {
            updateProduct = await dispatch(thunkCreateProduct(newProduct))
            history.push(`/products/${updateProduct.id}`);
        } else if (formType === 'Update Product') {
            console.log("before dispatch update product");
            updateProduct = await dispatch(thunkUpdateProduct({...newProduct, id: product.id}));
            console.log("Returned from thunkUpdateProduct:", updateProduct);
            history.push(`/products/${updateProduct.id}`);
        }
    }


    return (
        <form id="product-form" onSubmit={handleSubmit}>
            <div id="product-form-container">
                <div>
                    <h2>{formType}</h2>
                </div>

                {errors.name && <p className="error">{errors.name}</p>}
                <label className="required">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>

                {errors.description && <p className="error">{errors.description}</p>}
                <label className="required">
                    <textarea
                        type="textarea"
                        placeholder="Product Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />

                </label>

                <select
                    value={selectSize}
                    onChange={e => setSelectSize(e.target.value)}
                    required
                >
                    <option value="" disabled>Product Size</option>
                    {Object.entries(SIZES_ENUM).map(([sizeKey, sizeValue]) => (
                    <option key={sizeKey} value={sizeKey}>{sizeValue}</option>
                    ))}
                </select>

                {errors.price && <p className="error">{errors.price}</p>}
                <label className="required">
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />

                </label>

                <select
                    value={selectCategory}
                    onChange={e => setSelectCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Type</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {errors.primaryImg && <p className="error">{errors.primaryImg}</p>}
                <label className="required">
                    <input
                        type="text"
                        placeholder="Product Image URL"
                        value={primaryImg}
                        onChange={e => setPrimaryImg(e.target.value)}
                        required
                    />
                </label>

                {errors.secondaryImg && <p className="error">{errors.secondaryImg}</p>}
                <input
                    type="text"
                    placeholder="Product Image URL"
                    value={secondaryImg}
                    onChange={e => setSecondaryImg(e.target.value)}
                />

                <button type="submit">{formType}</button>

            </div>
        </form>
    )
}

export default CreateProduct;