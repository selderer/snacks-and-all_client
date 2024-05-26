import api from "./index";

export class AdminsApi {
    static authenticateAdmin(payload) {
        return api.post('/admin/login', payload)
    }

    static addProduct(product) {
        return api.post('/admin/products/add', product)
    }

    static updateProduct(product) {
        return api.post(`/admin/products/${product.id}`, product)
    }

    static deleteProduct(id) {
        return api.delete(`/admin/products/${id}`)
    }
}
