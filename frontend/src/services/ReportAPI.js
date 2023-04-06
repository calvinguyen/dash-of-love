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
}