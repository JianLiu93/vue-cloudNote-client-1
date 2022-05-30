<template>
	<div>

	</div>
</template>

<script>
	export default {
		beforeRouteEnter(to, from, next) {
			console.log('refresh')
			next(() => vm.$router.replace({path: '/notebooks'}))
		}
	}
</script>

<style lang="less" scoped>

</style>