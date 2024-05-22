import api from "./index";

export class OrdersApi {
    static addOrder(order) {
        return api.post('/orders', order)
    }
}
