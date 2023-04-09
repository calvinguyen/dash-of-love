import axios from 'axios'

export default {
    getAddressByZip(zip) {
        return axios.get(`http://ZiptasticAPI.com/${zip}`);
    }
}