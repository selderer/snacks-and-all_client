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

    static searchProducts(name, limit) {
        let query = `/products?search=${name}`

        if (limit) {
            query += `&limit=${limit}`
        }

        return api.get(query)
    }

    static getFilteredProducts(filter) {
        let query = '/products?'

        if (filter.category) {
            query += `category=${filter.category}`
        }

        if (filter.type) {
            query += `&type=${filter.type}`
        }

        if (filter.search) {
            query += `&search=${filter.search}`
        }

        if (filter.from && filter.to) {
            query += `&from=${filter.from}&to=${filter.to}`
        }

        return api.get(query)
    }

    static updateProduct(id, product) {
        return api.post(`/products/update/${id}`, product)
    }

    static deleteProduct(id) {
        return api.post(`/products/delete/${id}`)
    }
}
