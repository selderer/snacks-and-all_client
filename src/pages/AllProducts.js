import SecondaryLayout from "../components/layouts/SecondaryLayout";
import { useEffect, useState } from "react";
import { ProductsApi } from "../api/products";
import classes from '../assets/css/pages/allProducts.module.css';
import {Loader, NumberInput} from "@mantine/core";
import cn from "classnames";
import ProductCard from "../components/productCard/ProductCard";
import {useSearchParams} from "react-router-dom";
import noProducts from "../assets/images/noProducts.gif";

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

const filterTypes = [
    {
        name: 'All',
        value: 'all'
    },
    {
        name: 'Bestseller',
        value: 'bestseller',
    },
    {
        name: 'Exotic',
        value: 'exotic',
    }
]

const AllProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [priceRangeFrom, setPriceRangeFrom] = useState(Number(searchParams.get('from')) || 0);
    const [priceRangeTo, setPriceRangeTo] = useState(Number(searchParams.get('to')) || 10000);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(searchParams.get('category') || 'all');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState(searchParams.get('type') || 'all');

    const handleCategoryFilter = (category) => {
        setSelectedCategoryFilter(category)
        searchParams.set('category', category)
        setSearchParams(searchParams)
    }

    const handleTypeFilter = (type) => {
        setSelectedTypeFilter(type)
        searchParams.set('type', type)
        setSearchParams(searchParams)
    }

    const handlePriceRangeFilter = () => {
        searchParams.set('from', priceRangeFrom.toString())
        searchParams.set('to', priceRangeTo.toString())
        setSearchParams(searchParams)

        getFilteredProducts()
    }

    const getFilteredProducts = () => {
        setProductsLoading(true);

        const filters = {}

        if (searchParams.get('search')) {
            filters.search = searchParams.get('search')
        }

        if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
            filters.category = selectedCategoryFilter
        }

        if (selectedTypeFilter && selectedTypeFilter !== 'all') {
            filters.type = selectedTypeFilter
        }

        if (priceRangeTo && priceRangeFrom) {
            filters.from = priceRangeFrom
            filters.to = priceRangeTo
        }

        ProductsApi.getFilteredProducts(filters).then(response => {
            setProducts(response.data)
        }).finally(() => {
            setProductsLoading(false);
        })
    }

    useEffect(() => {
        getFilteredProducts()
    }, [selectedCategoryFilter, selectedTypeFilter]);

    return (
        <SecondaryLayout>
            <div className="pageTitle">
                All available products
            </div>
            <div className={classes.allProductsWrapper}>
                <div className={classes.productsFiltersContainer}>
                    <div className={classes.productsFilter}>
                        <div className={classes.productsFilterTitle}>
                            Type
                        </div>
                        <div className={cn(classes.productsFilterCategoryWrapper, classes.productsCategoryFilterType)}>
                            {
                                filterTypes.map((type, index) => {
                                    return (
                                        <span
                                            className={cn(classes.productsCategoryFilter, { [classes.productsCategoryFilterActive]: selectedTypeFilter === type.value })}
                                            key={index}
                                            onClick={() => handleTypeFilter(type.value)}
                                        >
                                            { type.name }
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
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
                <div className={cn(classes.productsContainer, { [classes.productsEmptyContainer]: products.length === 0 })}>
                    {
                        productsLoading ? (
                            <Loader className="loader" color="var(--color-purple-700)" />
                        ) : (
                            products.length > 0 ? products.map((product, index) => {
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
                            }) : (
                                <div className={classes.productsNoFound}>
                                    <div className={classes.productsNoFoundTitle}>
                                        No products matching the filters
                                    </div>
                                    <div className={classes.productsNoFoundGif}>
                                        <img src={noProducts} alt="No products" />
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </SecondaryLayout>
    )
}

export default AllProducts;
