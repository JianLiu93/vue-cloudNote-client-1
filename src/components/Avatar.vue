<template>
	<div class="user-avatar">
		<span class="avatar" :title="user.username">{{slug}}</span>
	</div>
</template>

<script>
	export default {
		name: 'Avatar',
		data() {
			return {
				user: {
					username: 'John',
				},
				slug: 'J'
			}
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
	margin-top: 15px;
}
</style>