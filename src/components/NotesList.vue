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
							<span>{{item.title}}</span><i>{{item.noteCounts}}</i>
							<i class="action" @click.prevent.stop="onEdit(item)">编辑</i>
							<i class="action" @click.prevent.stop="onDelete(item)">删除</i>
							<i class="date">修改时间</i>
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
				let title = window.prompt('创建笔记本名称');
				if(!title || !title.trim()) {
					alert('笔记本名为空！');
					return;
				}
				Notebook.addNotebook({title})
				  .then(res => {
					  console.log(res);
					  alert(res.msg);
					  let notebook = res.data;
					  notebook.noteCounts = 0;
					  this.notebooks.push(notebook);
				  })
			},
			onEdit(notebook) {
				let title = window.prompt('修改笔记本名称', notebook.title);
				if(!title || !title.trim()) {
					alert('笔记本名为空！');
					return;
				}
				Notebook.updateNotebook(notebook.id, {title})
				  .then(res => {
					  console.log(res);
					  alert(res.msg);
					  notebook.title = title;
				  })
			},
			onDelete(notebook) {
				let isConfirm = window.confirm('确定要删除吗？');
				if(isConfirm) {
				Notebook.deleteNotebook(notebook.id)
				  .then(res => {
					  console.log(res);
					  alert(res.msg);
					  const index = this.notebooks.indexOf(notebook);
					  if(index !== -1) {
						  this.notebooks.splice(index, 1);
					  }
				  });
				}
			},
		}
	}
</script>

<style lang="less" scoped>
@import '../assets/style/notes-list.less';

</style>