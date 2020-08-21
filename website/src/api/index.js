import axios from 'axios'

const api = axios.create({
  baseURL: 'http://www.openmentorship.com:3000'    
})
  
export const registerUser = (payload) => api.post('/users/register', payload)

export const updateUser = (payload) => api.put(`/users/update/${payload._id}`, payload)

const apis = {
  registerUser,
  updateUser
}

export default apis