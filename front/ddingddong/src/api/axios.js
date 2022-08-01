import axios from "axios";

const instance = axios.create({
    baseURL: 'http://i7e102.p.ssafy.io:8000',
})

export default instance;