import axios from 'axios'

export default(url = import.meta.env.VITE_ROOT_API) => {
    return axios.create({
        baseURL: url,
    })
}