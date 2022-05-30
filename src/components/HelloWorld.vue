<template>
  <div class="hello">
    <div class="title"><h1>欢迎使用 易用云笔记</h1></div>
    <div class="intro">
      <div class="text">{{intro1}}</div>
      <div class="text">{{intro2}}</div>
    </div>
    <div class="button">
      <el-row class="register">
        <el-button type="primary" @click="toRegister">点击注册立即体验 GO</el-button>
      </el-row>
      <el-row class="login">
        <el-button plain @click="toCheck">我已注册，立刻记一笔</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      intro1: '这是一款轻量级便捷易用的云端笔记应用，助你随时记录、整理、云端同步笔记，捕捉每个灵光一闪的时刻',
      intro2: '帮助你保存高价值信息、整理知识，记录备忘，提升工作学习效率',
    }
  },
  computed: {
		...mapGetters(['check_log'])
  },
  methods: {
		...mapMutations(['setLoginShow']),

    toRegister() {
      this.$store.commit('setLoginShow', false); 
      this.$router.push({path: '/login'});
    },
    toCheck() {
      if(this.check_log) return this.$router.push('/note');
      else {
			  this.setLoginShow(true);
        return this.$router.push('/login');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;

  .title {
    margin-top: 80px;
    font-size: 40px;
  }
  .intro {
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 24px;
    .text {
      margin-bottom: 20px;
    }
  }
}
.button {
  flex: 1;
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.el-row {
  margin-bottom: 30px;
  width: 100%;
  &.login {
  }
  &.register {
  }
}
</style>
