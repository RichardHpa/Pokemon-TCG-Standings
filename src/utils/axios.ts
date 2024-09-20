import rawAxios from 'axios';

const axios = rawAxios.create();
axios.defaults.maxRedirects = 0; // Set to 0 to prevent automatic redirects
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && [301, 302, 307].includes(error.response.status)) {
            const redirectUrl = error.response.headers.location;
            return axios.get(redirectUrl);
        }
        return Promise.reject(error);
    }
);

export default axios;
