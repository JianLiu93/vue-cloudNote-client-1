<template>
	<div class="user-avatar">
		<span class="avatar" :title="username" @click="$router.replace({path: '/login'})">{{slug}}</span>
	</div>
</template>

<script>
	// import Auth from '@/models/auth';
import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'Avatar',
		data() {
			return {
			}
		},
		computed: {
			...mapGetters(['username', 'slug'])
		},

		methods: {
			...mapActions(['checkLogin'])
		},
		created() {
			this.checkLogin();
		},
	}
</script>

<style lang="less" scoped>
.avatar {
	display: inline-block;
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 32px;
	border-radius: 50%;
	background: #409eff;
	//   #f2b81c
	color: #fff;
	text-shadow: 1px 0 1px #795c19;
	font-weight: bold;
	text-transform: uppercase;
	font-size: 18px;
	margin-top: 20px;
	cursor: pointer;
}
</style>