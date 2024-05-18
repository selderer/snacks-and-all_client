import classes from '../../assets/css/components/productCard/productCard.module.css';
import cn from 'classnames';
import CartIconSmall from "../../assets/icons/CartIconSmall";
import { useNavigate } from "react-router-dom";
import CartIconMedium from "../../assets/icons/CartIconMedium";
import { useLocalStorage } from "../../utils/hooks";
import {useEffect, useRef, useState} from "react";
import {NumberInput} from "@mantine/core";

// Sizes can be 'small' and 'big'
const ProductCard = ({
    id,
    name,
    price,
    image,
    size = 'small',
    description = '',
}) => {
    const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProductCount, setCartProductCount] = useState(1);
    let navigate = useNavigate();
    const handlersRef = useRef(null);

    const handleCardClick = (e) => {
        e.stopPropagation();

        if (e.target.id === `product-counter-${id}`) {
            return
        }

        navigate(`/products/${id}`)
    }

    const handleCartClick = (e) => {
        e.stopPropagation();

        const product = {
            id,
            name,
            price,
            description,
            image,
            count: 1,
        }

        const initialCartProducts = JSON.parse(JSON.stringify(cartProducts))

        initialCartProducts.push(product)

        setCartProducts(initialCartProducts)
        setIsProductInCart(true)
        setCartProductCount(1)
    }

    const handleChangeCartProductCount = (count) => {
        const initialCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        const changingProductIndex = initialCartProducts.findIndex(product => product.id === id);

        initialCartProducts[changingProductIndex].count = count;

        setCartProducts(initialCartProducts);
        setCartProductCount(count);
    }

    const handleDecrement = (e) => {
        e.stopPropagation();

        handlersRef.current.decrement();
    }

    const handleIncrement = (e) => {
        e.stopPropagation();

        handlersRef.current.increment();
    }

    useEffect(() => {
        const productInCart = cartProducts.find(cartProduct => cartProduct.id === id);

        setIsProductInCart(!!productInCart)

        if (productInCart) {
            setCartProductCount(productInCart.count)
        }
    }, []);

    return (
        <>
            {
                size === 'small' ? (
                    <div onClick={handleCardClick} className={cn(classes.productCardSmall, classes.productCard)}>
                        <div className={classes.productCardImageContainerSmall}>
                            <img src={`/upload/${image}`} alt="Product" className={classes.productCardImage} />
                        </div>
                        <div className={cn(classes.productCardInfoWrapperSmall, classes.productCardInfoWrapper)}>
                            <div className={cn(classes.productCardInfo)}>
                                <div className={cn(classes.productCardTitle, classes.productCardTitleSmall)}>
                                    { name }
                                </div>
                                <div className={cn(classes.productCardPrice, classes.productCardPriceSmall)}>
                                    { price } &#1423;
                                </div>
                            </div>
                            {
                                isProductInCart ? (
                                    <div className={classes.productCardCounterWrapper}>
                                        <div
                                            className={
                                                cn(classes.productCardCounterButton, classes.productCardCounterButtonLeft)
                                            }
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
                                            className={classes.productCardCounter}
                                            id={`product-counter-${id}`}
                                        />
                                        <div
                                            className={
                                                cn(classes.productCardCounterButton, classes.productCardCounterButtonRight)
                                            }
                                            onClick={handleIncrement}
                                        >
                                            +
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={handleCartClick}
                                        className={cn(classes.productCardButton, classes.productCardButtonSmall)}
                                    >
                                        <CartIconSmall />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div onClick={handleCardClick} className={cn(classes.productCardBig, classes.productCard)}>
                        <div className={classes.productCardImageContainerBig}>
                            <img src={`/upload/${image}`} alt="Product" className={classes.productCardImage} />
                        </div>
                        <div className={cn(classes.productCardInfoWrapperBig, classes.productCardInfoWrapper)}>
                            <div className={cn(classes.productCardInfo)}>
                                <div className={cn(classes.productCardTitle, classes.productCardTitleBig)}>
                                    { name }
                                </div>
                                <div className={cn(classes.productCardPrice, classes.productCardPriceBig)}>
                                    { price } &#1423;
                                </div>
                            </div>
                            <div
                                onClick={handleCartClick}
                                className={cn(classes.productCardButton, classes.productCardButtonBig)}
                            >
                                <CartIconMedium />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProductCard;
