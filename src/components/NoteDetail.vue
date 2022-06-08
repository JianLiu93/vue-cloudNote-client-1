<template>
	<div id="note" class="detail" >
		<note-sidebar @update:notes="value => notes = value" @update:onDeleteNote="onDeleteNote"></note-sidebar>
		
		<div class="note-empty" :class="{hidden: showContent !== 'emptyNote'}">请选择要编辑的笔记或创建新笔记</div>
		<div class="note-empty" :class="{hidden: showContent !== 'emptyBook'}">
			<router-link to="/notebooks">请先创建新笔记本</router-link>
		</div>
		<div class="note-content" :class="{hidden: showContent !== 'content'}">
			<div class="note-bar">
				<span>创建日期：{{curNote.createdAtFriendly}}</span>
        		<span> | </span>
				<span>更新日期：{{curNote.updatedAtFriendly}}</span>
        		<span> | </span>
				<span>{{statusText}}</span>
				<span class="iconfont icon-delete" @click="onDeleteNote"/>
				<span class="iconfont" @click="onMarkdown" :class="isShowPreview? 'icon-eye' : 'icon-edit'"/>
			</div>
			<div class="note-title">
				<input type="text" v-model="curNote.title" @keydown="statusText='正在输入...'" @input="onUpdateTitle" placeholder="输入标题">
			</div>
			<div class="editor">
				<div style="height:calc(100% - 25px)">
          		<codemirror v-show="!isShowPreview" :value="curNote.content" :options="cmOptions"
				  @input="onUpdateNote" @inputRead="statusText = '正在输入...'" @keyHandled="onUpdateStatus" placeholder="请输入内容，支持 Markdown语法"></codemirror>
				</div>
				<div id="theme" class="preview markdown-body" v-show="isShowPreview" v-html="previewContent"></div>
			</div>
		</div>
	</div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar.vue';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
//  codemirror 组件引入
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/addon/display/placeholder.js';
// 引入markdown 样式
import '../assets/theme/github-markdown.css';
import prism from 'markdown-it-prism';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import 'prismjs/themes/prism-okaidia.css';
// 通常的默认值
const md = new MarkdownIt({html: true});
md.use(prism, {defaultLanguage: 'clike'});

let statusTimer = null;

	export default {
		name: 'NoteDetail',
  		components: { NoteSidebar, codemirror },
		
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
				statusText: '已保存',

				cmOptions: {
					tabSize: 4,
					mode: 'text/x-markdown',
					theme: 'neat',
					lineNumbers: false,
					line: true,
					viewportMargin: Infinity, 
				},
			}
		},
		computed: {
			...mapGetters(['notes', 'curNote', 'curBook']),

			previewContent() {
				return md.render(this.curNote.content || '请输入内容，支持 Markdown语法');
			},
			showContent() {
				if(!this.curBook.id) return 'emptyBook';
				else if(!this.curNote.id) return 'emptyNote';
				else return 'content';
			}
		},

		methods: {
			...mapMutations(['setCurNote']),

			...mapActions(['checkLogin', 'updateNote', 'deleteNote']),

			onUpdateNote: _.debounce(function(newText) {
				if(!this.curNote.id) return;
				if(this.curNote.content === newText) return;
				this.curNote.content = newText;
				this.updateNote({noteId: this.curNote.id,
				title: this.curNote.title, content: this.curNote.content
				}).then(() => {
					  this.statusText = '已保存';
				  }).catch(err => {
					console.log(err);
					  this.statusText = '保存失败';
				  });
			}, 1000),

			onUpdateTitle: _.debounce(function() {
				if(!this.curNote.id) return;
				this.updateNote({noteId: this.curNote.id,
				title: this.curNote.title, content: this.curNote.content
				}).then(() => {
					  this.statusText = '已保存';
				  }).catch(err => {
					console.log(err);
					  this.statusText = '保存失败';
				  });
			}, 1000),

			onUpdateStatus: function() {
				if(statusTimer) {clearTimeout(statusTimer);}
				this.statusText = '正在输入...';
				statusTimer = setTimeout(() => {
					this.statusText = '已保存';
				},800);
			},

			onDeleteNote() {
				this.deleteNote({noteId: this.curNote.id})
				  .then(data => {
          			  this.setCurNote();
					  console.log(this.curNote);
					  this.$router.replace({
            			path: '/note',
            			query: {notebookId: this.curBook.id, noteId: this.curNote.id}
            		  });
				  }).catch(err => {
					  this.$message.error(err);
				  });
			},
			onMarkdown() {
				this.isShowPreview = !this.isShowPreview;
				this.statusText = this.isShowPreview ? 'markdown预览中' : '已保存';
			},
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
	::v-deep .CodeMirror-scroll {
		height: 300px;
	}
}
</style>