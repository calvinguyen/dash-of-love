import API from './API'

export default {
    getFlavors() {
        return API().get('/flavors/');
    },
    getAdminFlavorView() {
        return API().get('/flavors/admin/flavors-view');
    },
    getFlavorById(id) {
        return API().get(`/flavors/${id}`);
    },
    updateFlavorById(id, data) {
        return API().put(`/flavors/${id}`, data);
    },
    getStatusDescriptions() {
        return API().get('/flavors/status/descriptions');
    },
}