import axios from "axios";

// Get request
const get = async () => {
  const response = await axios.get("/events");
  return response.data;
};

// Post request
const create = async userData => {
  const response = await axios.post("/events", userData);
  return response.data;
};

// Put request
const update = async (id, newUserData) => {
  const response = await axios.put(`/events/${id}/`, newUserData);
  return response.data;
};

// Delete request
const remove = async id => {
  try {
    const response = await axios.delete(`/events/${id}/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const crud = {
  get,
  create,
  update,
  remove,
};

export default crud;
