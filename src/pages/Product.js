import SecondaryLayout from "../components/layouts/SecondaryLayout";
import classes from "../assets/css/pages/product.module.css";
import {useEffect, useState} from "react";
import {ProductsApi} from "../api/products";
import {useParams} from "react-router-dom";
import BestsellerIcon from "../assets/icons/BestsellerIcon";
import {Loader} from "@mantine/core";

const Product = () => {
    let { productId } = useParams();

    const [product, setProduct] = useState({});
    const [productLoading, setProductLoading] = useState(false);

    useEffect(() => {
        setProductLoading(true)
        console.log(productId, 'id')
        ProductsApi.getProductById(productId).then(response => {
            console.log(response, 'response')
            setProduct(response.data)
        }).finally(() => {
            setProductLoading(false)
        })
    }, [productId]);

    return (
        <SecondaryLayout>
            {
                productLoading ? (
                    <div className={classes.loaderContainer}>
                        <Loader color="var(--color-purple-700)" />
                    </div>
                ) : (
                    <div className={classes.productInfoContainer}>
                        <div className={classes.productInfoImageContainer}>
                            {
                                product.type === 'bestseller' && (
                                    <div className={classes.productInfoBadge}>
                                        <BestsellerIcon />
                                    </div>
                                )
                            }
                            <img src={`/upload/${product.image}`} alt="Product" className={classes.productInfoImage} />
                        </div>
                        <div className={classes.productInfo}>
                            <div className={classes.productInfoTop}>
                                <div className={classes.productInfoTitle}>
                                    { product.name }
                                </div>
                                <div className={classes.productInfoPrice}>
                                    { product.price } &#1423;
                                </div>
                            </div>
                            <div className={classes.productInfoDesc}>
                                { product.description }
                            </div>
                            <button className={classes.productInfoAddToCartButton}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                )
            }
        </SecondaryLayout>
    )
}

export default Product;