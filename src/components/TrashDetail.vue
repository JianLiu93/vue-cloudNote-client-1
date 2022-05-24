<template>
	<div id="trash-detail">
		<h1>{{msg}} : {{ $router.params.noteId }}</h1>
	</div>
</template>

<script>
// import Auth from '@/models/auth';

	export default {
		name: 'TrashDetail',
		data() {
			return {
				msg: '回收站页'
			}
		},
		created() {
			Auth.getInfo()
			  .then(res => {
				if(!res.isLogin) {
					this.$router.push({path: '/login'});
				}
			})
		},
	}
</script>

<style lang="less" scoped>
	h1 {
		color: blue;
	}
</style>