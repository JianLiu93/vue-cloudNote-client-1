import Auth from '@/models/auth'
import router from '@/router/index'
import { Message } from 'element-ui'

const state = {
	user: null,
	isShowLogin: true,
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
	},
	setLoginShow(state, payload) {
		state.isShowLogin = payload
	},
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
	checkLogin({commit, state}, payload) {
		if(state.user !== null) return Promise.resolve()
		return Auth.getInfo()
		  .then(res => {
			if(!res.isLogin) {
				console.log('need login')
				router.push(payload)
			} else {
				commit('setUser', {user: res.data})
			}
		})
	},
	logout({commit}, payload = {path: '/login'}) {
		return Auth.logout()
		  .then(res => {
			commit('logout');
			router.push(payload);
		  })
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
