import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const [size, setSize] = useState('1 Pound')
    const [price, setPrice] = useState('')
    const [categories, setCategories] = useState([])
    const [selectCategory, setSelectCategory] = useState("")

    const [errors, setErrors] = useState({});

    // fetch categories
    useEffect(() => {
        async function fetchCate() {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json()
                setCategories(data.categories)
            } else {
                const error = await res.json()
                // add error to the state
                setErrors(prev => ({ ...prev, fetchCate: error.message }))
            }
        }
        fetchCate();
    }, [])

    useEffect(() => {
        const errors = {}
        if (name && name.length < 3) errors.name = "Name is required"
        if (description && description.length < 10) errors.description = "Description must have 10 or more characters"
        if (primaryImg && !primaryImg.endsWith('.png') && !primaryImg.endsWith('.jpg') && !primaryImg.endsWith('.jpeg')) {
            errors.primaryImg = 'Image URL must end with .png, .jpg, or .jpeg';
          }
        if (secondaryImg && !secondaryImg.endsWith('.png') && !secondaryImg.endsWith('.jpg') && !secondaryImg.endsWith('.jpeg')) {
            errors.secondaryImg = 'Image URL must end with .png, .jpg, or .jpeg';
          }

        if (price && isNaN(price)) errors.price = "Price is required"

        setErrors(errors)
    }, [name, description, primaryImg, secondaryImg, price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const variant = {
            size,
            price,
        };

        const newProduct = {
            name,
            description,
            primary_img: primaryImg,
            secondary_img: secondaryImg,
            // size,
            // price,
            category_id: selectCategory,
            variants: [variant],
            // size: variant.size,
            // price: variant.price
        }
        console.log("Sending data to server:", newProduct);



        let updateProduct;
        if (formType === "Create Product") {
            console.log("About to dispatch thunkCreateProduct...");
            updateProduct = await dispatch(thunkCreateProduct(newProduct))
            console.log('after dispatch', updateProduct);
            history.push(`/products/${updateProduct.id}`);
        } else if (formType === 'Update Product') {
            updateProduct = await dispatch(thunkUpdateProduct({...newProduct, id: product.id}));
            history.push(`/products/${updateProduct.id}`);
        }
    }


    return (
        <div id="product-form-container">
            <h2>{product ? "Update Product" : "Create Product"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <textarea
                    type="textarea"
                    placeholder="Product Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                {errors.description && <p className="error">{errors.description}</p>}

                <select
                    value={size}
                    onChange={e => setSize(e.target.value)}
                    required
                >
                    <option value="" disabled>Product Size</option>
                    <option value="1 Pound">1 Pound</option>
                    <option value="1/4 Pound">1/4 Pound</option>
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
                {errors.price && <p className="error">{errors.price}</p>}

                <select
                    value={selectCategory}
                    onChange={e => setSelectCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Type</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Product Image URL"
                    value={primaryImg}
                    onChange={e => setPrimaryImg(e.target.value)}
                    required
                />
                {errors.primaryImg && <p className="error">{errors.primaryImg}</p>}

                <input
                    type="text"
                    placeholder="Product Image URL"
                    value={secondaryImg}
                    onChange={e => setSecondaryImg(e.target.value)}
                />
                {errors.secondaryImg && <p className="error">{errors.secondaryImg}</p>}


                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default CreateProduct;
