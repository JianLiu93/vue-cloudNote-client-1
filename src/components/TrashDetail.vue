<template>
	<div id="trash-detail">
		<h1>{{msg}} : {{ $router.params.noteId }}</h1>
	</div>
</template>

<script>
	export default {
		name: 'TrashDetail',
		data() {
			return {
				msg: '回收站页'
			}
		}
	}
</script>

<style lang="less" scoped>
	h1 {
		color: blue;
	}
</style>