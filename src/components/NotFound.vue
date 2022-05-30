<template>
	<div id="not">
		<div class="msg">404 访问了错误的地址，内容无法显示</div>
	<router-link to="/">返回首页</router-link>
	</div>
</template>

<script>

	export default {
		name: 'NotFound',
	}
</script>

<style lang="less" scoped>
	#not {
		flex: 1;
		text-align: center;
	}
	.msg {
		margin-top: 100px;
		margin-bottom: 200px;
		color: #666;
		font-size: 50px;
		font-weight: 700;
	}
	a {
		display: inline-block;
		font-size: 20px;
		padding: 6px 10px;
		border: 1px solid #b0b0b0;
		border-radius: 8px;
	}
</style>