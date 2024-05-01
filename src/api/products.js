import api from "./index";

export class ProductsApi {
    static getAllProducts() {
        return api.get('/products/all')
    }

    static getProductsByCategory(category) {
        return api.get(`/products?category=${category}`)
    }

    static getProductsByType(type, limit = null) {
        let query = `/products?type=${type}`;

        if (limit) {
            query += `&limit=${limit}`
        }

        return api.get(query)
    }

    static getProductById(id) {
        return api.get(`/products/find/${id}`)
    }

    static addProduct(payload) {
        return api.post(`/products/add`, payload)
    }

    static uploadImage(formData) {
        return api.post('/upload', formData)
    }

    static getProductsByPriceRange({ from, to }) {
        return api.get(`products?from=${from}&to=${to}`)
    }
}
