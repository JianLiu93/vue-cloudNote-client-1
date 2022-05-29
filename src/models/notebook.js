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
					item.createdAtFriendly = lastDate(item.createdAt);
					item.updatedAtFriendly = lastDate(item.updatedAt);
				});
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		})
	},
	addNotebook({title = ''} = {title:''}) {
		return new Promise((resolve, reject) => {
			request(URL.ADD, 'POST', {title})
			  .then(res => {
				res.data.createdAtFriendly = lastDate(res.data.createdAt);
				res.data.updatedAtFriendly = lastDate(res.data.updatedAt);
				resolve(res);
			}).catch(err => {
				  reject(err);
			  });
		})
	},
	updateNotebook(notebookId, {title = ''} = {title:''}) {
		return request(URL.UPDATE.replace('id', notebookId), 'PATCH', {title});
	},
	deleteNotebook(notebookId) {
		return request(URL.DELETE.replace('id', notebookId), 'DELETE');
	},
}
