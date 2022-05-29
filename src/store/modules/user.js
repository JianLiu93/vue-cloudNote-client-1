import Auth from '@/models/auth'
import router from '@/router/index'
import { Message } from 'element-ui'

const state = {
	user: null
}

const getters = {
	username: state => (!!state.user) ? state.user.username : '未知用户',

	slug: state => (!!state.user) ? state.user.username.charAt(0) : '未',
}

const mutations = {
	setUser(state, payload) {
		state.user = payload.user
	},
	logout(state) {
		state.user = null
	}
}

const actions = {
	login({commit}, {username, password}) {
		return Auth.login({username, password})
		  .then(res => {
			commit('setUser', {user: res.data})
		})
	},
	register({commit}, {username, password}) {
		return Auth.register({username, password})
		  .then(res => {
		    commit('setUser', {user: res.data})
			Message.success(res.msg)
		  })
	},
	checkLogin({commit}, payload) {
		return Auth.getInfo()
		  .then(res => {
			if(!res.isLogin) {
				console.log('need login')
				router.push(payload)
			} else {
				commit('setUser', {user: res.data})
			}
		})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
