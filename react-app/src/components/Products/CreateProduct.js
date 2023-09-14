import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom"
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
        if (!price || isNaN(price) || price <= 0) errors.price = "Price must be greater than 0";

        if (formType === "Create Product") {
            if (!primaryImg) errors.primaryImg = "First image is required"
            if (!secondaryImg) errors.secondaryImg = "Second image is required"
        } else if(formType === 'Update Product' && !primaryImg && !product.primary_img) {
            errors.primaryImg = "First image is required"
        } else if (formType === 'Update Product' && !secondaryImg && !product.secondary_img) {
            errors.secondaryImg = "Second image is required"
        }

        setErrors(errors)
    }, [name, description, price])

    useEffect(() => {
        if (formType === 'Update Product') {
            setName(product.name);
            setDescription(product.description);
            setPrimaryImg(product.primary_img);
            setSecondaryImg(product.secondary_img);
            setSelectSize(product.size);
            setPrice(product.price);
            setSelectCategory(product.category);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);

        if (primaryImg) {
            formData.append("primary_img", primaryImg);
        }
        if (secondaryImg) {
            formData.append("secondary_img", secondaryImg);
        }

        formData.append("size", selectSize);
        formData.append("price", price);
        formData.append("category", selectCategory);
        // const newProduct = {
        //     name,
        //     description,
        //     primary_img: primaryImg,
        //     secondary_img: secondaryImg,
        //     size: selectSize,
        //     price,
        //     category: selectCategory,
        // }


        let updateProduct;
        if (formType === "Create Product") {
            updateProduct = await dispatch(thunkCreateProduct(formData))
            history.push(`/products/${updateProduct.id}`);
        } else if (formType === 'Update Product') {
            formData.append("id", product.id)
            updateProduct = await dispatch(thunkUpdateProduct(formData))
            // updateProduct = await dispatch(thunkUpdateProduct({...newProduct, id: product.id}));
            history.push(`/products/${updateProduct.id}`);
        }
    }


    return (
        <form id="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div id="product-form-container">
                <div>
                    <h2>{formType}</h2>
                </div>

                {errors.name && <p className="error">{errors.name}</p>}
                <label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>

                {errors.description && <p className="error">{errors.description}</p>}
                <label>
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

                {/* {errors.price && <p className="error">{errors.price}</p>} */}
                <label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        min="1"
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

                {/* {errors.primaryImg && <p className="error">{errors.primaryImg}</p>} */}
                {/* {product.primaryImg && (
                    <div>
                        <label>Current Image:</label>
                        <img src={product.primaryImg} width="80" height="80" />
                    </div>
                )} */}
                {/* {errors.primaryImg && <p className="error">{errors.primaryImg}</p>} */}
                <label>
                    <input
                        type="file"
                        placeholder="File URL"
                        // value={primaryImg}
                        onChange={e => setPrimaryImg(e.target.files[0])}
                        accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
                        required={formType === "Create Product" || !product.primaryImg}
                    />
                </label>

                {/* {errors.secondaryImg && <p className="error">{errors.secondaryImg}</p>} */}
                {/* {product.secondaryImg && (
                    <div>
                        <label>Current Image:</label>
                        <img src={product.secondaryImg} width="80" height="80" />
                    </div>
                )} */}
                {/* {errors.secondaryImg && <p className="error">{errors.secondaryImg}</p>} */}
                <label>
                    <input
                        type="file"
                        placeholder="File URL"
                        // value={secondaryImg}
                        onChange={e => setSecondaryImg(e.target.files[0])}
                        accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
                        required={formType === "Create Product" || !product.secondaryImg}
                    />

                </label>

                <div className="create-btns">
                    <NavLink to={"/products/current"}>
                        <button>Back</button>
                    </NavLink>
                    <button type="submit">{formType}</button>
                </div>
            </div>
        </form>
    )
}

export default CreateProduct;
