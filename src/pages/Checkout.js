import MainLayout from "../components/layouts/MainLayout";
import classes from "../assets/css/pages/checkout.module.css";
import { useState } from "react";
import CheckoutFirstScreen from "../components/checkout/CheckoutFirstScreen";
import CheckoutSecondScreen from "../components/checkout/CheckoutSecondScreen";
import CheckoutThirdScreen from "../components/checkout/CheckoutThirdScreen";
import { OrdersApi } from "../api/orders";
import {useLocalStorage} from "../utils/hooks";

const Checkout = () => {
    const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
    const [orderData, setOrderData] = useState(null)
    const [currentShowingScreen, setCurrentShowingScreen] = useState(1)

    const setSecondScreen = (data) => {
        setOrderData(data)
        setCurrentShowingScreen(2)
    }

    const handlePay = () => {
        OrdersApi.addOrder(orderData).then(() => {
            console.log("Added order")
            setCurrentShowingScreen(3)
            setCartProducts([])
        })
    }

    const getCurrentScreen = () => {
        switch (currentShowingScreen) {
            case 1:
                return <CheckoutFirstScreen handleFillCardInfo={setSecondScreen} />
            case 2:
                return <CheckoutSecondScreen handlePay={handlePay} />
            case 3:
                return <CheckoutThirdScreen />
            default:
                return <CheckoutFirstScreen handleFillCardInfo={setSecondScreen} />
        }
    }

    return (
        <MainLayout>
            {
                currentShowingScreen !== 3 && (
                    <div className="pageTitle">
                        Checkout your order
                    </div>
                )
            }
            <div className={classes.checkoutContainer}>
                { getCurrentScreen() }
            </div>
        </MainLayout>
    )
}

export default Checkout;
