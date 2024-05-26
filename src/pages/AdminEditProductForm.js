import classes from "../assets/css/pages/admin.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/productForm/ProductForm";
import { ProductsApi } from "../api/products";

const AdminEditProductForm = () => {
    const navigate = useNavigate();
    let { productId } = useParams();

    const handleEdit = (product) => {
        ProductsApi.updateProduct(productId, product).then(response => {
            alert('Product updated')
        })
    }

    const handleDelete = () => {
        ProductsApi.deleteProduct(productId).then(res => {
            navigate('/admin/edit')
            alert('Product deleted')
        })
    }

    return (
        <div className={classes.editProductContainer}>
            <div className={classes.editProductTop}>
                <Link to={'/admin/edit'}>
                    Get back
                </Link>
                <div className={classes.editProductTitle}>
                    Edit product
                </div>
                <button onClick={handleDelete} className={classes.deleteButton}>
                    Delete
                </button>
            </div>

            <ProductForm id={productId} handleFormSubmit={handleEdit} />
        </div>
    )
}

export default AdminEditProductForm