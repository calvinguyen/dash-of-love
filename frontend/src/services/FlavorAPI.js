import API from './API'

export default {
    getFlavors() {
        return API().get('/flavors/');
    },
    getAdminFlavorView() {
        return API().get('/flavors/admin/flavors-view');
    },
}