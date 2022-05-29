import request from "@/helpers/request";
import {lastDate} from '@/helpers/util';

const URL = {
	GET: '/notes/trash',
	REVERT: '/notes/noteId/revert',
	DELETE: '/notes/noteId/confirm',
}

export default {
	getAll() {
		return new Promise((resolve, reject) => {
			request(URL.GET)
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

	revertNote({noteId}) {
		return request(URL.REVERT.replace('noteId', noteId), 'PATCH');
	},
	deleteNote({noteId}) {
		return request(URL.DELETE.replace('noteId', noteId), 'DELETE');
	},
}
