import axios from 'axios';

const baseURL = 'http://localhost:1220/api/v1/users';
export const fetchEmployees = () => {
    return axios.get(baseURL)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching employees: ', error);
            throw error;
        });
};


export const deleteEmployee = (id) => {
    return axios.delete(`${baseURL}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error deleting employee with ID ${id}: `, error);
            throw error;
        });
};
