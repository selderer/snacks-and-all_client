import axios from 'axios';

const url = `http://localhost:8800/api`

const api = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

export default api;
