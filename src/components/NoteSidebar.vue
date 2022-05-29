<template>
	<div id="note-side-bar">
		<header>
		<div class="btn add-note" @click="onAdd">添加笔记</div>
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

	export default {
		created() {
			this.getNotebooks()
			  .then(() => {
				this.setCurBook({curBookId: this.$route.query.notebookId});
				return this.getNotes({notebookId: this.curBook.id});
			}).then(() => {
				this.setCurNote({curNoteId: this.$route.query.noteId});
			})
		},

		data() {
			return {
			}
		},
		
		computed: {
			...mapGetters(['notebooks', 'notes', 'curBook']),
		},

		methods: {
			...mapMutations(['setCurBook', 'setCurNote']),

			...mapActions([
				'getNotebooks', 'addNotebook', 'updateNotebook', 'deleteNotebook',
				'getNotes', 'addNote'
			]),

			handleCommand(notebookId) {
				if(notebookId === 'trash') {
					return;
				}
        		this.setCurBook({ curBookId: notebookId});
				this.getNotes({notebookId});
				this.$router.push({ path: `/note?notebookId=${notebookId}`});
			},
			onAdd() {
				this.addNote({notebookId: this.curBook.id});
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../assets/style/note-sidebar.less';
</style>