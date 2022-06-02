<template>
  <div id="app" :style="{height:h+'px'}">
    <div class="wrapper">
      
    <side-bar class="side-bar" />    
    <router-view v-if="isRouterAlive" />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'App',
  components: { SideBar },

  provide(){
    return{
      reload: this.reload
    }
  },

  data() {
    return {
    h: document.documentElement.clientHeight,
    isRouterAlive: true
    }
  },
  methods: {
    reload (){
      this.isRouterAlive = false;
      this.$nextTick(() => {
        console.log('reload');
        this.isRouterAlive = true;
      })
    },
  }
}
</script>

<style lang="less">
@import '//at.alicdn.com/t/font_496303_exkj65zylocu9pb9.css';
// @import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';
@import './assets/style/reset.css';

body {
  background: #eee;
		&::-webkit-scrollbar{width:0;}
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  display: flex;
  align-items: stretch;
  height: 100%;
}
.side-bar {
  height: 100%;
}

.btn {
  display: inline-block;
  padding: 2px 4px;
  color: #666;
  font-size: 12px;
  background-color: #fff;
  border: none;
  box-shadow: 0px 0px 2px 0px #ccc;
  cursor: pointer;
}
</style>
