import request from "@/helpers/request";
import {lastDate} from '@/helpers/util';

const URL = {
	GET: '/notebooks',
	ADD: '/notebooks',
	UPDATE: '/notebooks/id',
	DELETE: '/notebooks/id',
}

export default {
	getAll() {
		return new Promise((resolve, reject) => {
			request(URL.GET)
			  .then(res => {
				res.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt)
				}).forEach(item => {
					item.friendlyCreatedAt = lastDate(item.createdAt);
				});
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		})
	},
	addNotebook({title = ''} = {title:''}) {
		return request(URL.ADD, 'POST', {title});
	},
	updateNotebook(notebookId, {title = ''} = {title:''}) {
		return request(URL.UPDATE.replace('id', notebookId), 'PATCH', {title});
	},
	deleteNotebook(notebookId) {
		return request(URL.DELETE.replace('id', notebookId), 'DELETE');
	},
}
