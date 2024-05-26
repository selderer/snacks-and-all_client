import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CategoryProducts from "../pages/CategoryProducts";
import Admin from "../pages/Admin";
import AdminAddProduct from "../pages/AdminAddProduct";
import AdminEditProduct from "../pages/AdminEditProduct";
import AdminEditProductForm from "../pages/AdminEditProductForm";

const Root = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/chips" element={<CategoryProducts category="chips" />} />
            <Route path="/products/drinks" element={<CategoryProducts category="drink" />} />
            <Route path="/products/cookies" element={<CategoryProducts category="cookie" />} />
            <Route path="/products/chocolate" element={<CategoryProducts category="chocolate" />} />
            <Route path="/products/candy" element={<CategoryProducts category="candy" />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add" element={<AdminAddProduct />} />
            <Route path="/admin/edit" element={<AdminEditProduct />} />
            <Route path="/admin/edit/:productId" element={<AdminEditProductForm />} />
        </Routes>
    )
}

export default Root;
