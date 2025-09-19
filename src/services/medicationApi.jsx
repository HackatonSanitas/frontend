import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; 

export const medicationApi = {
    // Get all medications
    getAll() {
        return axios.get(`${API_URL}/medications`);
    },

    // Get today's medications
    getToday() {
        return axios.get(`${API_URL}/medications/today`);
    },

    // Get tomorrow's medications
    getTomorrow() {
        return axios.get(`${API_URL}/medications/tomorrow`);
    },

    // Get this week's medications
    getWeek() {
        return axios.get(`${API_URL}/medications/week`);
    },

    // Get medication history
    getHistory() {
        return axios.get(`${API_URL}/medications/history`);
    },

    // Create new medication
    create(medication) {
        return axios.post(`${API_URL}/medications`, medication);
    },

    // Mark medication as taken (correct endpoint)
    markAsTaken(id) {
        return axios.post(`${API_URL}/medications/${id}/take`);
    },

    // Update existing medication
    update(id, medication) {
        return axios.put(`${API_URL}/medications/${id}`, medication);
    },

    // Delete medication
    delete(id) {
        return axios.delete(`${API_URL}/medications/${id}`);
    }
};