import API from './API'

export default {
    getActiveMenuFlavors() {
        return API().get('/menu/active-menu/flavors');
    },
    getActiveCakeTypes() {
        return API().get('/menu/active-menu/types');
    },
    getMenuItemById(id) {
        return API().get(`/menu/${id}`);
    },
    getFlavorsForCakeType(id) {
        return API().get(`/menu/cake-type/flavors/${id}`);
    },
    getCakeTypesForFlavor(id) {
        return API().get(`/menu/flavor/cake-types/${id}`);
    },
    updateMenuItemStatusByID(id, data) {
        return API().put(`/menu/status/${id}`, data);
    },
}