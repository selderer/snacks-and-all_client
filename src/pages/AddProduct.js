import MainLayout from "../components/layouts/MainLayout";
import {FileInput, NumberInput, Select, Textarea, TextInput} from "@mantine/core";
import { useState } from "react";
import classes from "../assets/css/pages/addProduct.module.css";
import { ProductsApi } from "../api/products";

const categoryOptions = ['drink', 'chocolate', 'cookie', 'chips', 'candy'];
const typeOptions = ['bestseller', 'exotic'];

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1100);
    const [category, setCategory] = useState('drink');
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('file', image);
        const response = await ProductsApi.uploadImage(formData)
        const fileUrl = response.data;

        const product = {
            name,
            description,
            price,
            category,
            type,
            image: fileUrl
        }

        ProductsApi.addProduct(product).then(response => {
            console.log(response, 'Added product')
        }).catch(err => {
            console.log(err, 'Error on adding product')
        }).finally(() => {
            setName('')
            setDescription('')
            setPrice(1150)
            setType(null)
            setImage(null)
        })
    }

    return (
        <MainLayout>
            <div className={classes.addProductContainer}>
                <div className={classes.addProductTitle}>
                    Add product
                </div>

                <div className={classes.addProductFields}>
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
                    <FileInput
                        accept="image/png,image/jpeg,image/webp"
                        label="Product image"
                        value={image}
                        onChange={setImage}
                    />
                </div>

                <button onClick={handleAddProduct} className={classes.addProductButton}>
                    Add product
                </button>
            </div>
        </MainLayout>
    )
}

export default AddProduct;
