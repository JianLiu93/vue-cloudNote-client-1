import request from "@/helpers/request";
import {lastDate} from '@/helpers/util';

const URL = {
	GET: '/notes/from/notebookId',
	ADD: '/notes/to/notebookId',
	UPDATE: '/notes/noteId',
	DELETE: '/notes/noteId',
}

export default {
	getAll({ notebookId }) {
		return new Promise((resolve, reject) => {
			request(URL.GET.replace('notebookId', notebookId))
			  .then(res => {
				res.data.sort((a, b) => {
					return new Date(b.updatedAt) - new Date(a.updatedAt)
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
	addNote({notebookId}, {title = '', content = ''} = {title:'', content: ''}) {
		return new Promise((resolve, reject) => {
			request(URL.ADD.replace('notebookId', notebookId), 'POST', {title, content})
			  .then(res => {
				  res.data.createdAtFriendly = lastDate(res.data.createdAt);
				  res.data.updatedAtFriendly = lastDate(res.data.updatedAt);
				  resolve(res);
			  }).catch(err => {
				  reject(err);
			  });
		})
	},
	updateNote({noteId}, {title, content}) {
		return request(URL.UPDATE.replace('noteId', noteId), 'PATCH', {title, content});
	},
	deleteNote({noteId}) {
		return request(URL.DELETE.replace('noteId', noteId), 'DELETE');
	},
}
