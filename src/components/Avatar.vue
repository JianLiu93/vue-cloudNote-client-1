<template>
	<div class="user-avatar">
		<span class="avatar" :title="user.username">{{slug}}</span>
	</div>
</template>

<script>
	import Auth from '@/models/auth';
	import eventBus from '@/helpers/eventBus';

	export default {
		name: 'Avatar',
		data() {
			return {
				user: {
					username: '未知用户',
				},
			}
		},
		computed: {
			slug() {
				return this.user.username.charAt(0) || '未';
			}
		},

		created() {
			// 触发登录同步事件
			eventBus.$on('userInfo', user => {
				console.log(user);
				this.user.username = user.username;
			});

			Auth.getInfo()
			  .then(res => {
				  console.log(res);
				  if(res.isLogin) {
					  this.user.username = res.data.username;
				  }
			  });
		},

		methods: {
			onLog() {}
		}
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
	background: #f2b81c;
	color: #fff;
	text-shadow: 1px 0 1px #795c19;
	font-weight: bold;
	text-transform: uppercase;
	font-size: 18px;
	margin-top: 20px;
}
</style>