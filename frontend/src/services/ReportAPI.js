export default {
    getMonthlyOrders() {
        return API().get('/reports/monthly-order/');
    },
    getReferralOrders() {
        return API().get('/reports/referral/');
    },
}