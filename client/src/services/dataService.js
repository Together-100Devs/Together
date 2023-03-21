import axios from "axios";

const URL = axios.create({
  withCredentials: true,
});

class DataService {
  create(msg) {
    return URL.post(`/events/`, msg);
  }
  getAll(from, to) {
    return URL.get("/events", { params: { from, to } });
  }
  getById(id) {
    return URL.get(`/events/${id}`);
  }
  deleteEvent(id) {
    return URL.delete(`/events/${id}`);
  }
  deleteAllEvents(groupId) {
    return URL.delete(`/events/deleteAllEvents/${groupId}`);
  }
  getCurrentUser() {
    return URL.get("/getDisplayName");
  }
  logout() {
    return URL.get("/auth/logout");
  }

  deleteNeedsToBeWelcome() {
    return URL.delete("/needsToBeWelcome");
  }
}

const dataService = new DataService();
export default dataService;
