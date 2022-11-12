import axios from 'axios';

const URL = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
    headers: {"Content-type": "application/json"}
})

class DataService {
    ping() {
        return URL.get(`/ping`)
    }
}

export default new DataService();