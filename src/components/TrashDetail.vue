<template>
	<div id="trash-detail">
	  <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div class="tags">更新时间</div>
        <div class="tags">标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id" @keyup.delete="onDelete">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{note.updatedAtFriendly}}</span>
            <span class="title">{{note.title}}</span>          
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-content">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{curTrashNote.createdAtFriendly}}</span> 
        <span> | </span>
        <span> 更新日期: {{curTrashNote.updatedAtFriendly}}</span>
        <span> | </span>
        <span> 所属笔记本: {{belongTo}}</span>

        <a class="btn action rev" @click.prevent="onRevert">恢复笔记</a>
        <a class="btn action del" @click.prevent="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{curTrashNote.title}}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="previewContent"></div>
      </div>
    </div>
	</div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
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

	export default {
		name: 'TrashDetail',
		data() {
			return {
			}
		},
    computed: {
      ...mapGetters(['trashNotes', 'curTrashNote', 'belongTo']),

      previewContent() {
				return md.render(this.curTrashNote.content || '');
			}
    },

		methods: {
      ...mapMutations(['setCurTrashNote']),

			...mapActions(['checkLogin', 'getTrashNotes',
      'deleteTrashNote', 'revertTrashNote', 'getNotebooks']),

      onRevert() {
        if(!this.curTrashNote.id) return this.$message.error('笔记不存在或未选中！');
        this.$confirm('将恢复该笔记至原位，确定吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.revertTrashNote({noteId: this.curTrashNote.id});
        }).then(() => {
            console.log('revert success');
            this.setCurTrashNote();
            this.$router.replace({
              path: '/trash',
              query: {noteId: this.curTrashNote.id}
            });
          });
      },
      onDelete() {
        if(!this.curTrashNote.id) return this.$message.error('笔记不存在或未选中！');
        this.$confirm('彻底删除后笔记将无法恢复，确定吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.deleteTrashNote({noteId: this.curTrashNote.id});
        }).then(() => {
          console.log('delete success')
          this.setCurTrashNote();
          this.$router.replace({
            path: '/trash',
            query: {noteId: this.curTrashNote.id}
            });
        });
      }
		},

		created() {
			this.checkLogin({path: '/login'});
      this.getNotebooks();
      this.getTrashNotes()
        .then(() => {
          if(this.$route.query.noteId) {
            this.setCurTrashNote({curTrashNoteId: this.$route.query.noteId});
          }
          this.$router.replace({
              path: '/trash', query: {noteId: this.curTrashNote.id}
          });
        });
		},

    beforeRouteUpdate(to, from, next) {
      console.log("beforeRouteUpdate");
      this.setCurTrashNote({curTrashNoteId: to.query.noteId});
      next();
    }
	}
</script>

<style lang="less" scoped>
@import '../assets/style/trash-sidebar.less';
@import '../assets/style/note-detail.less';

#trash-detail {
  display: flex;
  align-items: stretch;
  flex: 1;
  background: #fff;

  .note-bar {
    .action.btn {
      font-size: 14px;
      &.rev:hover {
        background: #add6ff;
      }
      &.del:hover {
        background: #f56c6c;
      }
    }
  }
}
</style>