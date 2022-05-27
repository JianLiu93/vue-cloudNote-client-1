<template>
	<div id="note" class="detail">
		<note-sidebar></note-sidebar>
		<div class="note-content">
			<div class="note-bar">
				<span>创建日期：{{curNote.createdAtFriendly}}</span>
				<span>更新日期：{{curNote.updatedAtFriendly}}</span>
				<span>{{curNote.statusText}}</span>
				<span class="iconfont icon-delete" />
				<span class="iconfont icon-fullscreen" />
			</div>
			<div class="note-title">
				<input type="text" :value="curNote.title" placeholder="输入标题">
			</div>
			<div class="editor">
				<textarea v-show="true" :value="curNote.content" name="" id="" placeholder="请输入内容，支持 Markdown语法"/>
				<div class="preview markdown" v-show="false" v-html="1"></div>
			</div>
		</div>
	</div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar.vue';
// import Auth from '@/models/auth';

	export default {
		name: 'NoteDetail',
  		components: { NoteSidebar },
		data() {
			return {
				curNote: {
					title: '我的笔记',
					content: '',
					createdAtFriendly: '',
					updatedAtFriendly: '',
					statusText: '已保存'
				}
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
@import '../assets/style/note-detail.less';

#note {
	display: flex;
	align-items: stretch;
	flex: 1;
	background: #fff;

	.note-content {
		flex: 1;
	}
}
</style>