import axios from 'axios'

// Get request
const get = async () => {
    const response = await axios.get('http://localhost:2121/events')
    return response.data;
}
    
// Post request
const create = async userData => {
    const response = await axios.post('http://localhost:2121/events', {
        ...userData
    })
    return response.data;
}

// Put request
const update = async (id, newUserData) => {
  const response = await axios.put(`http://localhost:2121/events/${id}/`, newUserData);
  return response.data;
}

// Delete request
const remove = async id => {
  try {
    const response = await axios.delete(`http://localhost:2121/events/${id}/`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}



export default {
  get,
  create,
  update,
  remove
}
