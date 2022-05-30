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
			<li v-for="note in notes" :key="note.id" @keyup.delete="$emit('update:onDeleteNote')">
				<router-link :to="`/note?notebookId=${curBook.id}&noteId=${note.id}`">
				 <!-- @keyup.delete="$emit('update:onDeleteNote')" -->
					<span class="date" :title="'创建于 '+ note.createdAtFriendly">{{note.updatedAtFriendly}}</span>
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
				if(this.$route.query.notebookId) {
				  this.setCurBook({curBookId: this.$route.query.notebookId});
				}
				if(this.curBook.id) return this.getNotes({ notebookId: this.curBook.id})
			}).then(() => {
				if(this.$route.query.noteId) {
				  this.setCurNote({curNoteId: this.$route.query.noteId});
				}
				if(this.curNote.id) {
				  this.$router.replace({
					  path: '/note',
					  query: {
						  notebookId: this.curBook.id,
						  noteId: this.curNote.id
					  }
				  });
				} else if(this.notes[0]) {
				  this.$router.replace({
					  path: '/note',
					  query: {
						  notebookId: this.curBook.id,
						  noteId: this.curNote.id || this.notes[0].id
					  }
				  });	
				}
			});
		},

		data() {
			return {
			}
		},
		
		computed: {
			...mapGetters(['notebooks', 'notes', 'curBook', 'curNote']),
		},

		methods: {
			...mapMutations(['setCurBook', 'setCurNote']),

			...mapActions([
				'getNotebooks', 'getNotes', 'addNote'
			]),

			handleCommand(notebookId) {
				if(notebookId === 'trash') return;
        		this.setCurBook({ curBookId: notebookId});
				this.getNotes({notebookId})
				  .then(() => {
          			this.setCurNote();
					if(this.curNote.id) {
				  		this.$router.replace({
					  	path: '/note',
					  	query: {
						  notebookId: this.curBook.id,
						  noteId: this.curNote.id
					  	}
				  		});
					} else if(this.notes[0]) {
				  		this.$router.replace({
					  	path: '/note',
					  	query: {
						  notebookId: this.curBook.id,
						  noteId: this.curNote.id || this.notes[0].id
					  	}
				  		});	
					}
				});
			},
			onAdd() {
				if(this.curBook.id) {
				  this.addNote({notebookId: this.curBook.id})
				  .then(() => {
					  this.$router.replace({
					  	path: '/note',
					  	query: {
						  notebookId: this.curBook.id,
						  noteId: this.notes[0].id
					  	}
				  	  });
				  })
				} else {
					 this.$message.warning({message: '请先创建新笔记本'});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../assets/style/note-sidebar.less';
</style>