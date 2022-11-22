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
}

export default new DataService();
