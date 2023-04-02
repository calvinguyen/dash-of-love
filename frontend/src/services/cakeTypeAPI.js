import API from './API'

export default {
    getCakeTypes() {
        return API().get('/types/');
    },
    getAdminTypeView() {
        return API().get('/types/admin/types-view');
    },
}