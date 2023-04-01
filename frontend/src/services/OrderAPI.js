import API from './API'

export default {
    getOrders() {
        return API().get('/orders/');
    },
    getOrderById(id) {
        return API().get(`/orders/${id}`);
    },
    getFullOrderDetailsById(id) {
        return API().get(`/orders/admin/full-order/${id}`);
    },
    createOrder(data) {
        return API().post('/orders/', data);
    },
    getAdminOrderView() {
        return API().get('/orders/admin/order');
    },
    getStatusDescriptions() {
        return API().get('/orders/status/descriptions');
    },
    updateOrder(orderID, data) {
        return API().put(`/orders/${orderID}`, data);
    },
    updateOrderById(orderID, data) {
        return API().put(`/orders/${orderID}`, data);
    },
    getCustomerOrders(id) {
        return API().get(`/orders/customer/order-history/${id}`);
    },
}