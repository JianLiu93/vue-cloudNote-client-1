<template>
	<div id="side-bar">
		<Avatar />
		<div class="icons">
			<router-link to="/notebooks" title="笔记本列表"><notebook-one class="iconfont" theme="two-tone" :fill="['#fff','#333']" size="20" /></router-link>
			<router-link to="/note" title="编辑笔记"><Notes class="iconfont" theme="two-tone" :fill="['#fff','#333']" size="20" /></router-link>
			<router-link to="/trash" title="回收站"><recycle-bin class="iconfont" theme="two-tone" :fill="['#fff','#333']" size="20" /></router-link>
		</div>
		<div class="logout" @click="onLogout">
			<span class="iconfont icon-logout" style="font-size:18px;"></span>
		</div>
	</div>
</template>

<script>
	import Avatar from '@/components/Avatar.vue'
    import { mapActions } from 'vuex'
	import { NotebookOne, Notes, RecycleBin } from '@icon-park/vue';

	export default {
		name: 'SideBar',
  		components: { Avatar, NotebookOne, Notes, RecycleBin },
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