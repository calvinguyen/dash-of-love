import API from './API'

export default {
    getCakeTypes() {
        return API().get('/types/');
    }
}