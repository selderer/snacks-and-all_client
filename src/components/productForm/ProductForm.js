import classes from "../../assets/css/components/productForm/productForm.module.css";
import { FileInput, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { ProductsApi } from "../../api/products";

const categoryOptions = ['drink', 'chocolate', 'cookie', 'chips', 'candy'];
const typeOptions = ['bestseller', 'exotic'];

const ProductForm = ({
     id = null,
     handleFormSubmit
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1100);
    const [category, setCategory] = useState('drink');
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);

    const handleProductFormSubmit = () => {
        handleFormSubmit({
            name,
            description,
            price,
            category,
            type,
            image
        })

        // If we're creating a new product, resetting all values
        if (!id) {
            setName('')
            setDescription('')
            setPrice(1150)
            setType(null)
            setImage(null)
        }
    }

    useEffect(() => {
        if (id) {
            ProductsApi.getProductById(id).then(response => {
                const { name, price, category, type, image, description } = response.data;

                setName(name);
                setPrice(price);
                setCategory(category);
                setType(type);
                setImage(image);
                setDescription(description);
            })
        }
    }, [id]);

    return (
        <>
            <div className={classes.productFormFields}>
                <TextInput
                    label="Product name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                />
                <Textarea
                    label="Product description"
                    value={description}
                    onChange={(event) => setDescription(event.currentTarget.value)}
                />
                <Select
                    label="Product category"
                    value={category}
                    data={categoryOptions}
                    onChange={setCategory}
                />
                <Select
                    label="Product type"
                    value={type}
                    data={typeOptions}
                    onChange={setType}
                />
                <NumberInput
                    label="Product price"
                    value={price}
                    onChange={setPrice}
                />
                <div className={classes.productFormImageWrapper}>
                    {
                        id && (
                            <div className={classes.productFormImage}>
                                <img src={`/upload/${image}`} alt="Product" />
                            </div>
                        )
                    }
                    <FileInput
                        accept="image/png,image/jpeg,image/webp"
                        label="Product image"
                        className={classes.productFormImageField}
                        value={image}
                        onChange={setImage}
                    />
                </div>
            </div>
            <button onClick={handleProductFormSubmit} className={classes.productFormButton}>
                { id ? 'Edit product' : 'Add product' }
            </button>
        </>
    )
}

export default ProductForm;
