import classes from "../assets/css/pages/addProduct.module.css";
import { ProductsApi } from "../api/products";
import ProductForm from "../components/productForm/ProductForm";
import {Link} from "react-router-dom";

const AdminAddProduct = () => {
    const handleAddProduct = async (product) => {
        const formData = new FormData();
        formData.append('file', product.image);
        const response = await ProductsApi.uploadImage(formData)
        const fileUrl = response.data;

        const creatingProduct = {
            ...product,
            image: fileUrl
        }

        ProductsApi.addProduct(creatingProduct).then(response => {
            console.log(response, 'Added product')
        }).catch(err => {
            console.log(err, 'Error on adding product')
        })
    }

    return (
        <div className={classes.addProductContainer}>
            <div className={classes.addProductTop}>
                <Link to={'/admin'}>
                    Get back
                </Link>
                <div className={classes.addProductTitle}>
                    Add product
                </div>
            </div>

            <ProductForm handleFormSubmit={handleAddProduct} />
        </div>
    )
}

export default AdminAddProduct;
