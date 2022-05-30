import Notebook from '@/models/notebook'
import { Message } from 'element-ui'

const state = {
	notebooks: null,
	curBookId: null,
}

const getters = {
	notebooks: state => state.notebooks || [],
	curBook: state => {
		if(!state.notebooks) return {}
		if(!state.curBookId) return state.notebooks[0] || {}
		return state.notebooks.find(item => item.id.toString() === state.curBookId.toString()) || {}
	}
}

const mutations = {
	setNotebooks(state, payload) {
		state.notebooks = payload.notebooks
	},
	addNotebook(state, payload) {
		state.notebooks.unshift(payload.notebook)
	},
	updateNotebook(state, payload) {
		let notebook = state.notebooks.find(item => item.id.toString() === payload.notebookId.toString()) || {}
		notebook.title = payload.title
		notebook.updatedAt = new Date().toISOString()
		notebook.updatedAtFriendly = '刚刚'
	},
	deleteNotebook(state, payload) {
		state.notebooks = state.notebooks.filter(item => item.id.toString() !== payload.notebookId.toString())
	},
	setCurBook(state, payload) {
		state.curBookId = payload.curBookId
	}
}

const actions = {
	getNotebooks({commit}) {
		return Notebook.getAll()
		  .then(res => {
			commit('setNotebooks', {notebooks: res.data})
		})
	},
	addNotebook({commit}, payload) {
		return Notebook.addNotebook({title: payload.title})
		  .then(res => {
			res.data.noteCounts = 0;
		    commit('addNotebook', {notebook: res.data})
			Message.success(res.msg)
		  })
	},
	updateNotebook({commit}, payload) {
		return Notebook.updateNotebook(payload.notebookId, {title: payload.title})
		  .then(res => {
			commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
			Message.success(res.msg)
		})
	},
	deleteNotebook({commit}, payload) {
		return Notebook.deleteNotebook(payload.notebookId)
		  .then(res => {
			commit('deleteNotebook', {notebookId: payload.notebookId})
			Message.success(res.msg)
		})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}