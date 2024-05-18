import classes from "../assets/css/pages/categoryProducts.module.css";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import ProductCard from "../components/productCard/ProductCard";
import { ProductsApi } from "../api/products";
import MainLayout from "../components/layouts/MainLayout";

const categories = [
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
];

const CategoryProducts = ({
    category
}) => {
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);

    useEffect(() => {
        setProductsLoading(true);

        ProductsApi.getProductsByCategory(category).then(response => {
            setProducts(response.data);
        }).finally(() => {
            setProductsLoading(false);
        })
    }, [category]);

    return (
        <MainLayout>
            <div className="pageTitle">
                { categories.find(productCategory => productCategory.type === category).name }
            </div>
            <div className={classes.categoryProductsContainer}>
                {
                    productsLoading ? (
                        <div className={classes.categoryProductsLoading}>
                            <Loader className="loader" color="var(--color-purple-700)" />
                        </div>
                    ) : (
                        products.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            )
                        })
                    )
                }
            </div>
        </MainLayout>
    )
}

export default CategoryProducts;
