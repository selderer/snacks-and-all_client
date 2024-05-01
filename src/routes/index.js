import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../pages/AllProducts";
import Product from "../pages/Product";
import CategoryProducts from "../pages/CategoryProducts";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/products',
        element: <AllProducts />,
    },
    {
        path: '/products/:productId',
        element: <Product />,
    },
    {
        path: '/cart',
        element: <div>Cart</div>,
    },
    {
        path: '/checkout',
        element: <div>Checkout</div>,
    },
    {
        path: '/products/chips',
        element: <CategoryProducts category="chips" />,
    },
    {
        path: '/products/drinks',
        element: <CategoryProducts category="drink" />,
    },
    {
        path: '/products/cookies',
        element: <CategoryProducts category="cookie" />,
    },
    {
        path: '/products/chocolate',
        element: <CategoryProducts category="chocolate" />,
    },
    {
        path: '/products/candy',
        element: <CategoryProducts category="candy" />,
    },
    {
        path: '/products/add',
        element: <AddProduct />,
    }
]);