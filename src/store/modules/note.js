import Notes from '@/models/notes'
import { Message } from 'element-ui'

const state = {
	notes: null,
	curNoteId: null
}

const getters = {
	notes: state => state.notes || [],

	curNote: state => {
		if(!state.notes) return {title: '', content: ''}
    	if(!state.curNoteId) return state.notes[0] || {title: '', content: ''}
		return state.notes.find(item => item.id.toString() === state.curNoteId.toString()) || {title: '', content: ''}
	}
}

const mutations = {
	setNotes(state, payload) {
		state.notes = payload.notes
	},
	addNote(state, payload) {
		state.notes.unshift(payload.note)
	},
	updateNote(state, payload) {
		let note = state.notes.find(item => item.id.toString() === payload.noteId.toString())
		note.title = payload.title
		note.content = payload.content
		note.updatedAt = new Date().toISOString()
		note.updatedAtFriendly = '刚刚'
	},
	deleteNote(state, payload) {
		state.notes = state.notes.filter(item => item.id.toString() !== payload.noteId.toString())
	},
	setCurNote(state, payload = {}) {
		state.curNoteId = payload.curNoteId
	}
}

const actions = {
	getNotes({commit}, {notebookId}) {
		return Notes.getAll({notebookId})
		  .then(res => {
			commit('setNotes', {notes: res.data})
		})
	},
	addNote({commit}, {notebookId, title, content}) {
		return Notes.addNote({notebookId}, {title, content})
		  .then(res => {
		    commit('addNote', {note: res.data})
			Message.success(res.msg)
		  })
	},
	updateNote({commit}, {noteId, title, content}) {
		return Notes.updateNote({noteId}, {title, content})
		  .then(res => {
			commit('updateNote', {noteId, title, content})
		})
	},
	deleteNote({commit}, {noteId}) {
		return Notes.deleteNote({noteId})
		  .then(res => {
			commit('deleteNote', {noteId})
			Message.success(res.msg)
		})
	}
}

export default {
	state, getters, mutations, actions
}