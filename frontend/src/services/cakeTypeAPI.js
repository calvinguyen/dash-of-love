import API from './API'

export default {
    getCakeTypes() {
        return API().get('/types/');
    },
    getAdminTypeView() {
        return API().get('/types/admin/types-view');
    },
    getTypeById(id) {
        return API().get(`/types/${id}`);
    },
    updateTypeById(id, data) {
        return API().put(`/types/${id}`, data);
    },
    getStatusDescriptions() {
        return API().get('/types/status/descriptions');
    },
}