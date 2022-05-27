<template>
	<div id="note-side-bar">
		<header>
		<div class="btn add-note" @click="add">添加笔记</div>
		<el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
			<div class="el-dropdown-link">
				<span>{{curBook.title}}</span><span class="iconfont icon-down"/>
			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-for="item in notebooks" :key="item.id" :command="item.id">{{item.title}}
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		</header>
		<div class="menu">
			<div class="tags">更新时间</div>
			<div class="tags">标题</div>
		</div>
		<ul class="notes">
			<li v-for="note in notes" :key="note.id">
				<router-link :to="`/note?notebookId=${curBook.id}&noteId=${note.id}`">
					<span class="date">{{note.updatedAtFriendly}}</span>
					<span class="title">{{note.title}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import Notebook from '@/models/notebook';
import Notes from '@/models/notes';
import eventBus from '@/helpers/eventBus';
import {lastDate} from '@/helpers/util';

	export default {
		name: 'NoteDetail',
		data() {
			return {
				notebooks: [],
				notes: [],
				curBook: {id: ''},
			}
		},
		created() {
			Notebook.getAll()
			  .then(res => {
				this.notebooks = res.data;
				this.curBook = this.notebooks.find(item => item.id == this.$route.query.notebookId)
				|| this.notebooks[0] || {};
				return Notes.getAll({ notebookId: this.curBook.id });
			}).then(res => {
				this.notes = res.data;
				this.$emit('update:notes', this.notes);
				eventBus.$emit('update:notes', this.notes);
			})
		},
		methods: {
			handleCommand(notebookId) {
				if(notebookId === 'trash') {
					return;
				}
				this.$router.push({ path: `/note?notebookId=${notebookId}`});
				Notes.getAll({notebookId})
				  .then(res => {
					this.curBook = this.notebooks.find(item => item.id == notebookId);
					this.notes = res.data;
					this.$emit('update:notes', this.notes)
					console.log(res.data);
				});
			},
			add() {
				Notes.addNote({notebookId: this.curBook.id})
				.then(res => {
					console.log(res);
					this.$message.success(res.msg);
					this.notes.unshift(res.data);
					this.$emit('update:notes', this.notes);
				});
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../assets/style/note-sidebar.less';
</style>