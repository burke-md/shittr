import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	withCredentials: true,
});

instance.interceptors.response.use(
	(res) => {
		console.log('API RESPONSE', res);
		return res;
	}
)

export default instance;
