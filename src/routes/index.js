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
        path: '/products/sweets',
        element: <div>sweets</div>,
    },
    {
        path: '/products/drinks',
        element: <div>drinks</div>,
    },
    {
        path: '/products/drinks',
        element: <div>cookies</div>,
    },
]);