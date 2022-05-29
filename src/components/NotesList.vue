<template>
	<div id="notes-list" class="detail">
		<header>
			<a href="#" class="btn" @click.prevent="onCreate">
				<span class="iconfont icon-plus"/><i>新建笔记本</i>
			</a>
		</header>
		<main>
			<div class="layout">
				<h3>笔记本列表 ({{notebooks.length}})</h3>
				<div class="book-list">
					<router-link v-for="item in notebooks" :key="item.id" :to="`/note?notebookId=${item.id}`" class="notebook clearfix">
						<div>
							<span class="iconfont icon-notebook"/>
							<span class="title">{{item.title}}</span><i>{{item.noteCounts}}</i>
							<i class="delete" @click.prevent.stop="onDelete(item)">删除</i>
							<i class="edit" @click.prevent.stop="onEdit(item)">编辑</i>
							<i class="date">{{item.createdAtFriendly}}创建</i>
						</div>
					</router-link>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
// import Auth from '@/models/auth';
import { mapState, mapActions, mapGetters } from 'vuex';

	export default {
		name: 'NotesList',
		data() {
			return {
			}
		},

		created() {
			this.checkLogin({path: '/login'})
			this.getNotebooks()
		},

		computed: {
			...mapGetters(['notebooks']),
		},

		methods: {
			...mapActions([
				'getNotebooks',
			 	'addNotebook',
				'updateNotebook',
				'deleteNotebook',
				'checkLogin']
			),

			onCreate() {
			  this.$prompt('创建笔记本名称', '创建笔记本', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  inputPattern: /^.{1,30}$/,
			  inputErrorMessage: '命名不能为空，且不能超过30个字符'
			  }).then(({ value }) => {
			  	this.addNotebook({title: value});
			  });
			},
			onEdit(notebook) {
			  this.$prompt('修改笔记本名称', '修改名称', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  inputPattern: /^.{1,30}$/,
			  inputValue: notebook.title,
			  inputErrorMessage: '命名不能为空，且不能超过30个字符'
			  }).then(({ value }) => {
				this.updateNotebook({notebookId: notebook.id, title: value});
			  });
			},
			onDelete(notebook) {
			  this.$alert('确定要删除吗？', '删除笔记本', {
        	  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			  }).then(() => {
			    this.deleteNotebook({notebookId: notebook.id});
			  });
			},
		}
	}
</script>

<style lang="less" scoped>
@import '../assets/style/notes-list.less';

</style>