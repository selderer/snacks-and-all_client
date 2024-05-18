import LogoIconSmall from '../../assets/icons/LogoIconSmall.js';
import { Button, Input } from "@mantine/core";
import classes from '../../assets/css/components/header/header.module.css';
import { NavLink, useNavigate } from 'react-router-dom'
import CartIcon from "../../assets/icons/CartIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../utils/hooks";

const navigationCategories = [
    {
        name: 'Chips',
        link: '/products/chips'
    },
    {
        name: 'Chocolate',
        link: '/products/chocolate'
    },
    {
        name: 'Drinks',
        link: '/products/drinks'
    },
    {
        name: 'Cookies',
        link: '/products/cookies'
    },
    {
        name: 'Candy',
        link: '/products/candy'
    }
]

const Header = ({
    full = false
}) => {
    const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
    const [cartProductsPrice, setCartProductsPrice] = useState(0);
    const [cartProductsCount, setCartProductsCount] = useState(0);
    let navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart')
    }

    const handleShopNowClick = () => {
        navigate('/products')
    }

    const handleLogoClick = () => {
        navigate('/')
    }

    useEffect(() => {
        const cartProductsPrice = cartProducts.reduce((acc, product) => product.price * product.count + acc, 0)
        const cartProductsCount = cartProducts.reduce((acc, product) => product.count + acc, 0)

        setCartProductsPrice(cartProductsPrice)
        setCartProductsCount(cartProductsCount)
    }, [cartProducts, setCartProducts]);

    return (
        <>
            <div className={classes.headerTop}>
                <div onClick={handleLogoClick} className={classes.headerLogo}>
                    <LogoIconSmall />
                    <div className={classes.headerLogoText}>
                        Snacks and All
                    </div>
                </div>
                <div className={classes.headerSearch}>
                    <Input
                        type="text"
                        placeholder="Search your product"
                        radius="xs"
                        className={classes.headerSearchInput}
                    />
                    <button className={classes.headerSearchButton}>
                        <ion-icon name="search"></ion-icon>
                    </button>
                </div>
                <div className={classes.headerCart} onClick={handleCartClick}>
                    <div className={classes.headerCartIconContainer}>
                        <CartIcon />
                        <div className={classes.headerCartBadge}>
                            { cartProductsCount }
                        </div>
                    </div>
                    <div>
                        <div className={classes.headerCartInfoTitle}>
                            Shopping cart:
                        </div>
                        <div className={classes.headerCartInfoMoney}>
                            { cartProductsPrice } &#1423;
                        </div>
                    </div>
                </div>
            </div>
            {
                full && (
                    <div className={classes.headerBottom}>
                        <div className={classes.headerNavigationContainer}>
                            <Button
                                variant="filled"
                                radius="xs"
                                color="var(--color-purple-700)"
                                className={classes.headerNavigationMainButton}
                                onClick={handleShopNowClick}
                            >
                                Shop now
                            </Button>
                            <nav className={classes.headerNavigation}>
                                {
                                    navigationCategories.map((elem, index) => {
                                        return (
                                            <NavLink
                                                to={elem.link}
                                                className={classes.headerNavigationLink}
                                                key={index}
                                            >
                                                { elem.name }
                                            </NavLink>
                                        )
                                    })
                                }
                            </nav>
                        </div>
                        <div className={classes.headerContactInfo}>
                            <PhoneIcon />
                            <span className={classes.headerContactNumber}>
                                (091) 785-777
                            </span>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Header;
