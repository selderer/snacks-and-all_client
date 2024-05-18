import SecondaryLayout from "../components/layouts/SecondaryLayout";
import classes from "../assets/css/pages/product.module.css";
import {useEffect, useRef, useState} from "react";
import {ProductsApi} from "../api/products";
import {useParams} from "react-router-dom";
import BestsellerIcon from "../assets/icons/BestsellerIcon";
import {Loader, NumberInput} from "@mantine/core";
import cn from "classnames";
import {useLocalStorage} from "../utils/hooks";

const Product = () => {
    let { productId } = useParams();

    const [product, setProduct] = useState({});
    const [productLoading, setProductLoading] = useState(false);
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProductCount, setCartProductCount] = useState(0);
    const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
    const handlersRef = useRef(null);

    const handleAddToCart = () => {
        const cartProduct = {
            ...product,
            count: 1,
        }

        const initialCartProducts = JSON.parse(JSON.stringify(cartProducts))

        initialCartProducts.push(cartProduct)

        setCartProducts(initialCartProducts)
        setIsProductInCart(true)
        setCartProductCount(1)
    }

    const handleDecrement = (e) => {
        e.stopPropagation();

        handlersRef.current.decrement();
    }

    const handleIncrement = (e) => {
        e.stopPropagation();

        handlersRef.current.increment();
    }

    const handleChangeCartProductCount = (count) => {
        const initialCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        const changingProductIndex = initialCartProducts.findIndex(cartProduct => cartProduct.id === product.id);

        initialCartProducts[changingProductIndex].count = count;

        setCartProducts(initialCartProducts);
        setCartProductCount(count);
    }

    useEffect(() => {
        setProductLoading(true)

        ProductsApi.getProductById(productId).then(response => {
            const product = response.data

            setProduct(product)

            const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
            const productInCart = cartProducts.find(cartProduct => cartProduct.id === product.id)

            if (productInCart) {
                setIsProductInCart(true)
                setCartProductCount(productInCart.count)
            }
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
                            {
                                !isProductInCart ? (
                                    <button onClick={handleAddToCart} className={classes.productInfoAddToCartButton}>
                                        Add to cart
                                    </button>
                                ) : (
                                    <div className={classes.productCountWrapper}>
                                        <div
                                            className={cn(classes.productCounterButton, classes.productCounterButtonLeft)}
                                            onClick={handleDecrement}
                                        >
                                            -
                                        </div>
                                        <NumberInput
                                            value={cartProductCount}
                                            onChange={handleChangeCartProductCount}
                                            handlersRef={handlersRef}
                                            hideControls
                                            min={1}
                                            max={50}
                                            step={1}
                                            className={classes.productCounter}
                                            id={`product-counter-${product.id}`}
                                        />
                                        <div
                                            className={cn(classes.productCounterButton, classes.productCounterButtonRight)}
                                            onClick={handleIncrement}
                                        >
                                            +
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </SecondaryLayout>
    )
}

export default Product;