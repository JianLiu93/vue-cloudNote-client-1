<template>
	<div id="note" class="detail" >
		<note-sidebar @update:notes="value => notes = value"></note-sidebar>
		<div class="note-empty" :class="{hidden: contentIsShow}">请选择要编辑的笔记</div>
		<div class="note-content" :class="{hidden: !contentIsShow}">
			<div class="note-bar">
				<span>创建日期：{{curNote.createdAtFriendly}}</span>
				<span>更新日期：{{curNote.updatedAtFriendly}}</span>
				<span>{{statusText}}</span>
				<span class="iconfont icon-delete" @click="deleteNote"/>
				<span class="iconfont icon-fullscreen" @click="onMarkdown"/>
			</div>
			<div class="note-title">
				<input type="text" v-model="curNote.title" @keydown="statusText='正在输入...'" @input="updateNote" placeholder="输入标题">
			</div>
			<div class="editor">
				<textarea v-show="!isShowPreview" v-model="curNote.content" @input="updateNote"
				@keydown="statusText='正在输入...'" name="" id="" placeholder="请输入内容，支持 Markdown语法"/>
				<div class="preview markdown" v-show="isShowPreview" v-html="previewContent"></div>
			</div>
		</div>
	</div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar.vue';
import eventBus from '@/helpers/eventBus';
import Notes from '@/models/notes'
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
// import Auth from '@/models/auth';

let md = new MarkdownIt();

const defaultNote = {
					title: '',
					content: '',
					createdAtFriendly: '',
					updatedAtFriendly: '',
				}

	export default {
		name: 'NoteDetail',
  		components: { NoteSidebar },
		data() {
			return {
				contentIsShow: false,
				isShowPreview: false,
				notes: [],
				curNote: {},
				statusText: '已保存'
			}
		},
		computed: {
			previewContent() {
				return md.render(this.curNote.content || '');
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

		methods: {
			updateNote: _.debounce(function() {
				Notes.updateNote({noteId: this.curNote.id},
				{title: this.curNote.title, content: this.curNote.content})
				  .then(data => {
					  this.statusText = '已保存';
				  }).catch(err => {
					  this.statusText = '保存失败';
				  });
			}, 300),

			deleteNote() {
				Notes.deleteNote({noteId: this.curNote.id})
				  .then(data => {
					  this.notes.splice(this.notes.indexOf(this.curNote), 1);
					  this.$message.success(data.msg);
					  this.$router.replace({path: `/note?notebookId=${this.$route.query.notebookId}`});
				  }).catch(err => {
					  this.$message.error(err);
				  });
			},
			onMarkdown() {
				this.isShowPreview = !this.isShowPreview;
				this.statusText = this.isShowPreview ? 'markdown预览中' : '已保存';
			}
		}
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