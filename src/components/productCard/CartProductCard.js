import classes from '../../assets/css/components/productCard/cartProductCard.module.css';
import productCardClasses from '../../assets/css/components/productCard/productCard.module.css';
import cn from "classnames";
import { NumberInput } from "@mantine/core";
import { useLocalStorage } from "../../utils/hooks";
import { useRef } from "react";
import TrashIcon from "../../assets/icons/TrashIcon";
import {useNavigate} from "react-router-dom";

const CartProductCard = ({
    product
}) => {
    const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
    const handlersRef = useRef(null);
    let navigate = useNavigate();

    const handleChangeCartProductCount = (count) => {
        const initialCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        const changingProductIndex = initialCartProducts.findIndex(cartProduct => product.id === cartProduct.id);

        initialCartProducts[changingProductIndex].count = count;

        setCartProducts(initialCartProducts);
    }

    const handleDecrement = (e) => {
        e.stopPropagation();

        handlersRef.current.decrement();
    }

    const handleIncrement = (e) => {
        e.stopPropagation();

        handlersRef.current.increment();
    }

    const handleCardClick = (e) => {
        e.stopPropagation()
        e.stopPropagation()

        if (e.target.id === `product-counter-${product.id}`) {
            return
        }

        navigate(`/products/${product.id}`)
    }

    const handleDeleteProductFromCart = (e) => {
        e.stopPropagation()
        e.preventDefault()

        const updatedCartProducts = cartProducts.filter(cartProduct => cartProduct.id !== product.id)

        setCartProducts(updatedCartProducts)
    }

    return (
        <div onClick={handleCardClick} className={classes.cartProductCartContainer}>
            <div className={classes.cartProductCardImageWrapper}>
                <img className={classes.cartProductCardImage} src={`/upload/${product.image}`} alt="Product" />
            </div>
            <div className={classes.cartProductCardInfoWrapper}>
                <div>
                    <div className={classes.cartProductCardTitle}>
                        { product.name }
                    </div>
                    <div className={classes.cartProductCardPrice}>
                        { product.price } &#1423;
                    </div>
                    <div className={classes.cartProductCardDesc}>
                        { product.description }
                    </div>
                </div>
                <div className={classes.cartProductSecondary}>
                    <div className={classes.cartProductCardButtons}>
                        <div className={productCardClasses.productCardCounterWrapper}>
                            <div
                                className={
                                    cn(
                                        productCardClasses.productCardCounterButton,
                                        productCardClasses.productCardCounterButtonLeft
                                    )
                                }
                                onClick={handleDecrement}
                            >
                                -
                            </div>
                            <NumberInput
                                value={product.count}
                                onChange={handleChangeCartProductCount}
                                handlersRef={handlersRef}
                                hideControls
                                min={1}
                                max={50}
                                step={1}
                                className={productCardClasses.productCardCounter}
                                id={`product-counter-${product.id}`}
                            />
                            <div
                                className={
                                    cn(
                                        productCardClasses.productCardCounterButton,
                                        productCardClasses.productCardCounterButtonRight
                                    )
                                }
                                onClick={handleIncrement}
                            >
                                +
                            </div>
                        </div>
                        <button
                            onClick={handleDeleteProductFromCart}
                            id={`product-delete-${product.id}`}
                            className={classes.cartProductDeleteButton}
                        >
                            <TrashIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProductCard;
