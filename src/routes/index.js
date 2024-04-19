import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/products',
        element: <div>Products ALL</div>,
    },
    {
        path: '/products/:productId',
        element: <div>Product</div>,
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
        element: <div>Chips</div>,
    },
    {
        path: '/products/drinks',
        element: <div>drinks</div>,
    },
    {
        path: '/products/cookies',
        element: <div>cookies</div>,
    },
    {
        path: '/products/chocolate',
        element: <div>chocolate</div>,
    },
    {
        path: '/products/candy',
        element: <div>candy</div>,
    },
]);