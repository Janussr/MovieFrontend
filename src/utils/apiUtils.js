import axios from "axios";

const URL = 'https://localhost:7238';

const api = () => {

    const getUrl = () => {
        return URL;
    }

    const getAxios = () => {
        return axios.create()
    }

    return {
        getUrl,
        getAxios,
    }
}

export default api();