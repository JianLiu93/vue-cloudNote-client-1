<template>
	<div id="note" class="detail">
		<note-sidebar @update:notes="value => notes = value"></note-sidebar>
		<div class="note-empty" :class="{hidden: contentIsShow}">请选择要编辑的笔记</div>
		<div class="note-content" :class="{hidden: !contentIsShow}">
			<div class="note-bar">
				<span>创建日期：{{curNote.createdAtFriendly}}</span>
				<span>更新日期：{{curNote.updatedAtFriendly}}</span>
				<span>{{curNote.statusText}}</span>
				<span class="iconfont icon-delete" />
				<span class="iconfont icon-fullscreen" />
			</div>
			<div class="note-title">
				<input type="text" v-model="curNote.title" placeholder="输入标题">
			</div>
			<div class="editor">
				<textarea v-show="true" v-model="curNote.content" name="" id="" placeholder="请输入内容，支持 Markdown语法"/>
				<div class="preview markdown" v-show="false" v-html="1"></div>
			</div>
		</div>
	</div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar.vue';
import eventBus from '@/helpers/eventBus';
// import Auth from '@/models/auth';
const defaultNote = {
					title: '',
					content: '',
					createdAtFriendly: '',
					updatedAtFriendly: '',
					statusText: ''
				}

	export default {
		name: 'NoteDetail',
  		components: { NoteSidebar },
		data() {
			return {
				contentIsShow: false,
				notes: [],
				curNote: {}
			}
		},

		created() {
			Auth.getInfo()
			  .then(res => {
				if(!res.isLogin) {
					this.$router.push({path: '/login'});
				}
			});
			eventBus.$once('update:notes', val => {
				console.log(this.$route.query.noteId);
				if(this.$route.query.noteId) {
					const noteId = this.$route.query.noteId;
					this.curNote = val.find(note => note.id.toString() === noteId);
					this.contentIsShow = true;
				} else {this.contentIsShow = false;}
			});
		},
		// 路由组件内直接定义路由导航守卫
		beforeRouteUpdate(to, from, next) {
			console.log('before router update');
			if(to.query.noteId) {
				this.curNote = this.notes.find(item => item.id.toString() === to.query.noteId);
				this.contentIsShow = true;
				console.log(this.curNote);
			} else {
				this.contentIsShow = false;
				this.curNote = defaultNote;
			}
			next();
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