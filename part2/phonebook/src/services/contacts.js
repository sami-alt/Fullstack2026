import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContact = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const updateContactNumber = (id, newNum) => {
    const request = axios.put(`${baseUrl}/${id}`, newNum)
    return request.then(response => [response.data, response.status])
}

const removeContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

export default {getAll, addContact, removeContact, updateContactNumber}