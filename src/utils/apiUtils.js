import axios from "axios";

const URL = '<API url goes here>';

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