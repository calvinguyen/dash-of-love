import API from './API';

export default {
    getMonthlyOrders() {
        return API().get('/reports/monthly-order/');
    },
    getMonthlyOrdersByYear(year) {
        return API().get(`/reports/monthly-order/${year}`);
    },
    getReferralOrders() {
        return API().get('/reports/referral/');
    },
    getOrderStatuses() {
        return API().get('/reports/monthly-order-status/');
    },
    getCompletedOrders() {
        return API().get('/reports/completed-orders/');
    },
    getOrderPickUps() {
        return API().get('/reports/pickup-orders/');
    },
}