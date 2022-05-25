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
					<router-link v-for="item in notebooks" :key="item.id" to="/note/1" class="notebook clearfix">
						<div>
							<span class="iconfont icon-notebook"/>
							<span class="title">{{item.title}}</span><i>{{item.noteCounts}}</i>
							<i class="action" @click.prevent.stop="onDelete(item)">删除</i>
							<i class="action" @click.prevent.stop="onEdit(item)">编辑</i>
							<i class="date">{{item.friendlyCreatedAt}}</i>
						</div>
					</router-link>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
// import Auth from '@/models/auth';
import Notebook from '@/models/notebook';
import { lastDate } from '@/helpers/util';

	export default {
		name: 'NotesList',
		data() {
			return {
				notebooks: [],
			}
		},

		created() {
			Auth.getInfo()
			  .then(res => {
				if(!res.isLogin) {
					this.$router.push({path: '/login'});
				}
			})

			Notebook.getAll()
			  .then(res => {
				  this.notebooks = res.data;
				  console.log(res.data);
			  })
		},

		methods: {
			onCreate() {
			  this.$prompt('创建笔记本名称', '创建笔记本', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  inputPattern: /^.{1, 30}$/,
			  inputErrorMessage: '命名不能为空，且不能超过30个字符'
			  }).then(({ value }) => {
			  	return Notebook.addNotebook({title: value});
			  }).then(res => {
			  	let notebook = res.data;
			  	notebook.noteCounts = 0;
			  	notebook.friendlyCreatedAt = lastDate(notebook.createdAt);
			  	this.notebooks.unshift(notebook);
			  	this.$message({
			  		type: 'success',
			  		message: res.msg
			  	});
			  }).catch((res) => {
			    this.$message({
			  	type: 'error',
			  	message: res.msg
			    });       
			  });
			},
			onEdit(notebook) {
			  let title = '';
			  this.$prompt('修改笔记本名称', '修改名称', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  inputPattern: /^.{1, 30}$/,
			  inputErrorMessage: '命名不能为空，且不能超过30个字符'
			  }).then(({ value }) => {
				title = value;
				return Notebook.updateNotebook(notebook.id, {title});
			  }).then(res => {
				notebook.title = title;
			  	this.$message({
			  		type: 'success',
			  		message: res.msg
			  	});
			  }).catch((res) => {
			    this.$message({
			  	type: 'error',
			  	message: res.msg
			    });       
			  });
			},
			onDelete(notebook) {
			  this.$alert('确定要删除吗？', '删除笔记本', {
        	  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			  }).then(() => {
			    return Notebook.deleteNotebook(notebook.id);
			  }).then(res => {
			  const index = this.notebooks.indexOf(notebook);
			  this.notebooks.splice(index, 1);
			  this.$message({
			  	type: 'success',
			  	message: res.msg
			    });
			  }).catch((res) => {
			    this.$message({
			    type: 'error',
			    message: res.msg
			    });       
        	  });
			},
		}
	}
</script>

<style lang="less" scoped>
@import '../assets/style/notes-list.less';

</style>