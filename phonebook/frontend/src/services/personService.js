import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/contacts';


const getAll = () => {
    return (
        axios.get(baseURL).then(response => response.data) 
    )
}



const createContact = (newContact) => {
    return (
        axios
            .post(baseURL, newContact)
            .then(response => response.data)
    )
}

// 3.15: Phonebook database, step 3
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