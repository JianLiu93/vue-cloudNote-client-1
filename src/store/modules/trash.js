import Trash from '@/models/trash'
import { Message } from 'element-ui'

const state = {
	trashNotes: null,
	curTrashNoteId: null
}

const getters = {
	trashNotes: state => state.trashNotes || [],

	curTrashNote: (state, getters) => {
		if(!state.curTrashNoteId) return getters.trashNotes[0] || {}
		return state.trashNotes.find(item => item.id.toString() === state.curTrashNoteId.toString()) || {}
	},

	belongTo: (state, getters, rootState, rootGetters) => {
		if(!rootGetters.notebooks) return ''
		let notebook = rootGetters.notebooks.find(item => item.id == getters.curTrashNote.notebookId) || {}
		return notebook.title || ''
	}
}

const mutations = {
	setTrashNotes(state, payload) {
		state.trashNotes = payload.trashNotes
	},

	addTrashNote(state, payload) {
		setTrashNotes.unshift(payload.note)
	},

	deleteTrashNote(state, payload) {
		state.trashNotes = state.trashNotes.filter(item => item.id.toString() !== payload.noteId.toString())
		state.curTrashNoteId = null
	},

	setCurTrashNote(state, payload = {}) {
		state.curTrashNoteId = payload.curTrashNoteId
	}
}

const actions = {
	getTrashNotes({ commit }) {
		return Trash.getAll()
		  .then(res => {
			commit('setTrashNotes', { trashNotes: res.data })
		})
	},
	
	deleteTrashNote({ commit }, { noteId }) {
		return Trash.deleteNote({ noteId })
		  .then(res => {
			commit('deleteTrashNote', { noteId })
			Message.success(res.msg)
		})
	},
	
	revertTrashNote({ commit }, { noteId }) {
		return Trash.revertNote({ noteId })
		  .then(res => {
			commit('deleteTrashNote', { noteId })
			Message.success(res.msg)
		})
	}
}

export default {
	state, getters, mutations, actions
}