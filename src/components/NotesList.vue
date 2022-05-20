<template>
	<div id="notes-list">
		<h1>{{msg}}</h1>
	<ul>
		<li><router-link to="/note/1">笔记1</router-link></li>
		<li><router-link to="/note/2">笔记2</router-link></li>
	</ul>
	</div>
</template>

<script>
	export default {
		name: 'NotesList',
		data() {
			return {
				msg: '笔记列表'
			}
		}
	}
</script>

<style lang="less" scoped>

</style>