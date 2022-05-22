<template>
	<div id="side-bar">
		<Avatar />
		<div class="icons">
			<router-link to="/note/1" title="笔记1"><span class="iconfont icon-note"></span></router-link>
			<router-link to="/notebooks" title="笔记本"><span class="iconfont icon-notebook"></span></router-link>
			<router-link to="/trash/1" title="回收站"><span class="iconfont icon-trash"></span></router-link>
		</div>
		<div class="logout" @click="onLogout">
			<span class="iconfont icon-logout"></span>
		</div>
	</div>
</template>

<script>
	import Avatar from '@/components//Avatar.vue'

	export default {
		name: 'SideBar',
  		components: { Avatar },
		data() {
			return {

			}
		},
		methods: {
			onLogout() {}
		}
	}
</script>

<style lang="less" scoped>
	#sidebar {
		position: relative;
		width: 56px;
		text-align: center;
		background: #2c333c;
	}

	.icons {
		margin-top: 15px;
		a {
			display: block;
			padding: 6px 0;
		}
		.router-link-active {
			background: #5e6266;
		}
	}
	.logout {
		position: absolute;
		width: 100%;
		bottom: 20px;
		cursor: pointer;

		.iconfont {
			color: #333;
		}
	}
</style>