import axios from 'axios'

const api = axios.create({
    baseUrl: 'http://localhost:3000/'
})

//Mentees
export const createMentee = (payload) => api.post('/mentees/auth/linkedin', payload)

//Mentors
export const createMentor = (payload) => api.post('/mentors/createMentor', payload)

const apis = {
    createMentee,
    createMentor
}

export default apis

