import classes from "../../assets/css/pages/checkout.module.css";
import successfulOrderImage from "../../assets/images/successfulOrder.png";

const CheckoutThirdScreen = () => {
    return (
        <div className={classes.checkoutSuccessfulScreen}>
            <div className={classes.checkoutSuccessfulScreenTitle}>
                Your order has been successfully placed!
            </div>
            <div className={classes.checkoutSuccessfulImage}>
                <img src={successfulOrderImage} alt="Successful order" />
            </div>
            <div className={classes.checkoutSuccessfulScreenInfo}>
                It'll arrive in <span className={classes.checkoutSuccessfulScreenInfoImportant}>3 work days,</span> we will additionally contact you when it arrives.
                <br /> And you can always contact us if you have any questions!
            </div>
        </div>
    )
}

export default CheckoutThirdScreen;
