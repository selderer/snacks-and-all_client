import classes from '../../assets/css/components/productCard/productCard.module.css';
import cn from 'classnames';
import CartIconSmall from "../../assets/icons/CartIconSmall";
import {useNavigate} from "react-router-dom";
import CartIconMedium from "../../assets/icons/CartIconMedium";

// Sizes can be 'small' and 'big'
const ProductCard = ({
    id,
    name,
    price,
    image,
    size = 'small'
}) => {
    let navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${id}`)
    }

    const handleCartClick = (e) => {
        e.stopPropagation();

        console.log('Cart click')
    }

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
                            <div
                                onClick={handleCartClick}
                                className={cn(classes.productCardButton, classes.productCardButtonSmall)}
                            >
                                <CartIconSmall />
                            </div>
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
