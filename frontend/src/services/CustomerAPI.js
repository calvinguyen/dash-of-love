import API from './API'

export default {
    getCustomers() {
        return API().get('/customers/');
    },
    getCustomerByEmail(email) {
        return API().get(`/customers/email/${email}`);
    },
    getCustomerById(id) {
        return API().get(`/customers/${id}`);
    },
    createCustomer(data) {
        return API().post('/customers/', data);
    },
    getAdminCustomerView() {
        return API().get('/customers/admin/customer');
    },
    getStatusDescriptions() {
        return API().get('/customers/status/descriptions');
    },
    updateCustomerById(id, data) {
        return API().put(`/customers/${id}`, data);
    },
}