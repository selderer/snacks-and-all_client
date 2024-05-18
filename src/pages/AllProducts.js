import SecondaryLayout from "../components/layouts/SecondaryLayout";
import { useEffect, useState } from "react";
import { ProductsApi } from "../api/products";
import classes from '../assets/css/pages/allProducts.module.css';
import {Loader, NumberInput} from "@mantine/core";
import cn from "classnames";
import ProductCard from "../components/productCard/ProductCard";

const filterCategories = [
    {
        name: 'All',
        type: 'all'
    },
    {
        name: 'Drinks',
        type: 'drink'
    },
    {
        name: 'Chips',
        type: 'chips'
    },
    {
        name: 'Chocolate',
        type: 'chocolate'
    },
    {
        name: 'Cookies',
        type: 'cookie'
    },
    {
        name: 'Candy',
        type: 'candy'
    },
]

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [priceRangeFrom, setPriceRangeFrom] = useState(null);
    const [priceRangeTo, setPriceRangeTo] = useState(null);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

    useEffect(() => {
        setProductsLoading(true);

        ProductsApi.getAllProducts().then(response => {
            setProducts(response.data);
        }).finally(() => {
            setProductsLoading(false);
        })
    }, []);

    const handleCategoryFilter = (category) => {
        setSelectedCategoryFilter(category);
        setProductsLoading(true);

        if (category === 'all') {
            ProductsApi.getAllProducts().then(response => {
                setProducts(response.data);
            }).finally(() => {
                setProductsLoading(false);
            })
        } else {
            ProductsApi.getProductsByCategory(category).then(response => {
                console.log(response, 'response')
                setProducts(response.data);
            }).finally(() => {
                setProductsLoading(false);
            })
        }
    }

    const handlePriceRangeFilter = () => {
        setProductsLoading(true);

        ProductsApi.getProductsByPriceRange({
            from: priceRangeFrom,
            to: priceRangeTo,
        }).then(response => {
            setProducts(response.data);
        }).finally(() => {
            setProductsLoading(false);
        })
    }

    return (
        <SecondaryLayout>
            <div className="pageTitle">
                All available products
            </div>
            <div className={classes.allProductsWrapper}>
                <div className={classes.productsFiltersContainer}>
                    <div className={classes.productsFilter}>
                        <div className={classes.productsFilterTitle}>
                            Category
                        </div>
                        <div className={classes.productsFilterCategoryWrapper}>
                            {
                                filterCategories.map((category, index) => {
                                    return (
                                        <span
                                            className={cn(classes.productsCategoryFilter, { [classes.productsCategoryFilterActive]: selectedCategoryFilter === category.type })}
                                            key={index}
                                            onClick={() => handleCategoryFilter(category.type)}
                                        >
                                        { category.name }
                                    </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={classes.productsFilter}>
                        <div className={classes.productsFilterTitle}>
                            Price range
                        </div>
                        <div className={classes.productsPriceRangeWrapper}>
                            <div className={classes.productsPriceRangeInputs}>
                                <NumberInput
                                    placeholder="From"
                                    value={priceRangeFrom}
                                    allowNegative={false}
                                    min={0}
                                    max={priceRangeTo}
                                    hideControls
                                    className={classes.productsPriceRangeInput}
                                    onChange={setPriceRangeFrom}
                                />
                                <NumberInput
                                    placeholder="To"
                                    value={priceRangeTo}
                                    allowNegative={false}
                                    min={priceRangeFrom}
                                    hideControls
                                    className={classes.productsPriceRangeInput}
                                    onChange={setPriceRangeTo}
                                />
                            </div>
                            <button onClick={handlePriceRangeFilter} className={classes.productsPriceRangeButton}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
                <div className={classes.productsContainer}>
                    {
                        productsLoading ? (
                            <Loader className="loader" color="var(--color-purple-700)" />
                        ) : products.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    description={product.description}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </SecondaryLayout>
    )
}

export default AllProducts;
