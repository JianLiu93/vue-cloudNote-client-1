<template>
	<div id="note" class="detail" >
		<note-sidebar @update:notes="value => notes = value"></note-sidebar>
		<div class="note-empty" :class="{hidden: curNote.id}">请选择要编辑的笔记</div>
		<div class="note-content" :class="{hidden: !curNote.id}">
			<div class="note-bar">
				<span>创建日期：{{curNote.createdAtFriendly}}</span>
        		<span> | </span>
				<span>更新日期：{{curNote.updatedAtFriendly}}</span>
        		<span> | </span>
				<span>{{statusText}}</span>
				<span class="iconfont icon-delete" @click="onDeleteNote"/>
				<span class="iconfont icon-fullscreen" @click="onMarkdown"/>
			</div>
			<div class="note-title">
				<input type="text" v-model="curNote.title" @keydown="statusText='正在输入...'" @input="onUpdateNote" placeholder="输入标题">
			</div>
			<div class="editor">
				<textarea v-show="!isShowPreview" v-model="curNote.content" @input="onUpdateNote"
				@keydown="statusText='正在输入...'" name="" id="" placeholder="请输入内容，支持 Markdown语法"/>
				<div class="preview markdown" v-show="isShowPreview" v-html="previewContent"></div>
			</div>
		</div>
	</div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar.vue';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

let md = new MarkdownIt();

	export default {
		name: 'NoteDetail',
  		components: { NoteSidebar },
		
		created() {
			this.checkLogin({path: '/login'});
		},
		// 组件内直接定义路由导航守卫
		beforeRouteUpdate(to, from, next) {
			console.log('before router update');
			if(to.query.noteId) {
				this.setCurNote({curNoteId: to.query.noteId});
			}
			next();
		},

		data() {
			return {
				isShowPreview: false,
				statusText: '未编辑'
			}
		},
		computed: {
			...mapGetters(['notes', 'curNote']),

			previewContent() {
				return md.render(this.curNote.content || '');
			}
		},

		methods: {
			...mapMutations(['setCurNote']),

			...mapActions(['checkLogin', 'updateNote', 'deleteNote']),

			onUpdateNote: _.debounce(function() {
				if(!this.curNote.id) return;
				this.updateNote({noteId: this.curNote.id,
				title: this.curNote.title, content: this.curNote.content
				}).then(() => {
					  this.statusText = '已保存';
				  }).catch(err => {
					console.log(err);
					  this.statusText = '保存失败';
				  });
			}, 500),

			onDeleteNote() {
				this.deleteNote({noteId: this.curNote.id})
				  .then(data => {
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