import classes from '../assets/css/pages/admin.module.css';
import {Link, useNavigate} from "react-router-dom";
import {Input} from "@mantine/core";
import {useEffect, useState} from "react";
import {ProductsApi} from "../api/products";
import cn from "classnames";
import productCardClasses from '../assets/css/components/productCard/productCard.module.css'

const AdminEditProduct = () => {
    let navigate = useNavigate()
    const [searchString, setSearchString] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e) => {
        const searchingString = e.currentTarget.value;

        setSearchString(searchingString);

        ProductsApi.searchProducts(searchingString).then((res) => {
            setSearchResults(res.data)
        })
    }

    const handleCardClick = (id) => {
        navigate(`/admin/edit/${id}`)
    }

    useEffect(() => {
        ProductsApi.getAllProducts().then(response => {
            setSearchResults(response.data)
        })
    }, []);

    return (
        <div className={classes.editProductContainer}>
            <div className={classes.editProductTop}>
                <Link to={'/admin'}>
                    Get back
                </Link>
                <div className={classes.editProductTitle}>
                    Edit product
                </div>
            </div>

            <div className={classes.editProductWrapper}>
                <div className={classes.editProductSearch}>
                    <Input
                        type="text"
                        placeholder="Search product to edit"
                        radius="xs"
                        value={searchString}
                        onChange={handleSearch}
                        className={classes.editSearchInput}
                    />

                    <div className={classes.editProducts}>
                        <div className={classes.editProductsWrapper}>
                            {
                                searchResults.length > 0 ? (
                                    searchResults.map(product => {
                                        return (
                                            <div
                                                key={product.id}
                                                onClick={() => handleCardClick(product.id)}
                                                className={
                                                    cn(
                                                        productCardClasses.productCardSmall,
                                                        productCardClasses.productCard
                                                    )
                                                }
                                            >
                                                <div className={productCardClasses.productCardImageContainerSmall}>
                                                    <img src={`/upload/${product.image}`} alt="Product" className={productCardClasses.productCardImage} />
                                                </div>
                                                <div className={cn(productCardClasses.productCardInfoWrapperSmall, productCardClasses.productCardInfoWrapper)}>
                                                    <div className={cn(productCardClasses.productCardInfo)}>
                                                        <div className={cn(productCardClasses.productCardTitle, productCardClasses.productCardTitleSmall)}>
                                                            { product.name }
                                                        </div>
                                                        <div className={cn(productCardClasses.productCardPrice, productCardClasses.productCardPriceSmall)}>
                                                            { product.price } &#1423;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div>
                                        No products found by search
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminEditProduct;
