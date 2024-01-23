import axios from 'axios'

// const baseUrl = "https://back-telefono.onrender.com/api/persons"
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () =>{
  const request = axios.get(baseUrl)
  return request.then(response=> response.data)
}

const createUser = (newObj) => {
  const request = axios.post(baseUrl, newObj)
  return request.then(response => response.data)
}

const deleteUser = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response=>response.data)
}

const updateUser = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`,newObj)
  return request.then(response=>response.data)
}

export default {
  getAll,
  createUser,
  deleteUser,
  updateUser
}