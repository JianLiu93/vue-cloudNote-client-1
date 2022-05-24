<template>
	<div id="note-detail">
		<h1>{{msg}} : {{ $router.params.noteId }}</h1>
	</div>
</template>

<script>
// import Auth from '@/models/auth';

	export default {
		name: 'NoteDetail',
		data() {
			return {
				msg: '笔记详情页'
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

</style>