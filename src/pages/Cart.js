import SecondaryLayout from "../components/layouts/SecondaryLayout";
import { useLocalStorage } from "../utils/hooks";
import classes from "../assets/css/pages/cart.module.css";
import { useEffect, useState } from "react";
import CartProductCard from "../components/productCard/CartProductCard";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
    const [productsTotal, setProductsTotal] = useState(0);
    let navigate = useNavigate();

    const handleClearCart = () => {
        setCartProducts([])
    }

    const handleCheckout = () => {
        navigate('/checkout')
    }

    useEffect(() => {
        const productsTotal = cartProducts.reduce((acc, product) => product.price * product.count + acc, 0)

        setProductsTotal(productsTotal)
    }, [cartProducts])

    return (
        <SecondaryLayout>
            <div className="pageTitle">
                Products in cart
            </div>
            <div className={classes.cartContainer}>
                <div className={classes.cartWrapper}>
                    <div className={classes.cartTotal}>
                        Total: <span className={classes.cartTotalPrice}>{ productsTotal } &#1423;</span>
                    </div>
                    <div className={classes.cartProductsContainer}>
                        {
                            cartProducts.map(product => {
                                return (
                                    <CartProductCard product={product} key={product.id} />
                                )
                            })
                        }
                    </div>
                    <div className={classes.cartMainButtons}>
                        <button onClick={handleClearCart} className={classes.cartClearButton}>
                            Clear cart
                        </button>
                        <button onClick={handleCheckout} className={classes.cartCheckoutButton}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </SecondaryLayout>
    )
}

export default Cart;
