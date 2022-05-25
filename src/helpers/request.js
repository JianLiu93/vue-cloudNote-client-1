import axios from 'axios';
import baseURLConfig from './config-baseURL';
import { Message } from 'element-ui';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseURLConfig.baseURL;
axios.defaults.withCredentials = true;

function request(url, type = 'GET', data = {}) {
	return new Promise((resolve, reject) => {
		let option = {
			url,
			method: type,
			validateStatus(status) {
				return (status >=200 && status < 300) || status === 400;
			}
		}
		if(type.toUpperCase() === 'GET') {
			option.params = data;
		} else {
			option.data = data;
		}
		axios(option).then(res => {
			if(res.status === 200) {
				resolve(res.data);
			} else {
				Message({
					type: 'error',
					message: res.data.msg
				});
				reject(res.data);
			}
		}).catch(err => {
				Message({
					type: 'error',
					message: res.data.msg
				});
				reject({msg: 'connection error'});
		});
	});
}

// request('/auth/login', 'POST', {username: 'john', password: '12345678'})
//   .then(data => {
// 	  console.log(data);
//   });

export default request;