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
}