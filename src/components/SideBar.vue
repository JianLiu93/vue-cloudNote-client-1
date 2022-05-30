<template>
	<div id="side-bar">
		<Avatar />
		<div class="icons">
			<router-link to="/notebooks" title="笔记本列表"><span class="iconfont icon-notebook"></span></router-link>
			<router-link to="/note" title="编辑笔记"><span class="iconfont icon-note"></span></router-link>
			<router-link to="/trash" title="回收站"><span class="iconfont icon-trash"></span></router-link>
		</div>
		<div class="logout" @click="onLogout">
			<span class="iconfont icon-logout"></span>
		</div>
	</div>
</template>

<script>
	import Avatar from '@/components/Avatar.vue'
    import { mapActions } from 'vuex'

	export default {
		name: 'SideBar',
  		components: { Avatar },
		data() {
			return {
			}
		},
		methods: {
			...mapActions(['logout']),

			onLogout() {
				this.logout({path: '/login'});
			}
		}
	}
</script>

<style lang="less" scoped>
	#side-bar {
		position: relative;
		width: 56px;
		text-align: center;
		background: #2c333c;
		.iconfont {
			color: #fff;
		}
	}

	.icons {
		margin-top: 20px;
		a {
			display: block;
			padding: 20px 10px;
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
	}
</style>