import API from './API'

export default {
    getReferrals() {
        return API().get('/referrals/');
    }
}