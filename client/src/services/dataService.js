import axios from "axios";

const URL = axios.create({
  withCredentials: true,
});

class DataService {
  ping() {
    return URL.get(`/events/ping`);
  }
  create(msg) {
    return URL.post(`/events/create`, msg);
  }
  getAll() {
    return URL.get('/events')
  }
  getById(id) {
    return URL.get(`/events/${id}`)
  }
}

export default new DataService();
