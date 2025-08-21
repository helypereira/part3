import axios from 'axios';
const baseURL = 'http://localhost:3001/api/persons';


const getAll = () => {
    return (
        axios
        .get(baseURL)
        .then(response => response.data)
        
    )
}


const createContact = (newContact) => {
    return (
        axios
            .post(baseURL, newContact)
            .then(response => response.data)
    )
}


const deleteContact = (id) => {
    return (
        axios
            .delete(`${baseURL}/${id}`)
            .then(response => response.data)
    )
}

const updateContactNumber = (id, updatedContact) => {
    return (
        axios
            .put(`${baseURL}/${id}`,updatedContact)
            .then(response => response.data)
    )
}


export default {
    getAll,
    createContact,
    deleteContact,
    updateContactNumber
};