import axios from 'axios';
const API_URL = 'http://localhost:8080/api'; // Esta es la direccion de Spring Boot!

export const medicationApi = {
    getAll() {
        return axios.get(`${API_URL}/medications`);
    },
    create(medication) {
        return axios.post(`${API_URL}/medications`, medication);
    },
    markAsTaken(id) {
        return axios.post(`${API_URL}/medications/${id}/taken`);
    },
    delete(id) {
        return axios.delete(`${API_URL}/medications/${id}`);
    }
};