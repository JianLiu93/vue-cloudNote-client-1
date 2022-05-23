<template>
  <div id="app">
    <div class="wrapper">
    <side-bar class="side-bar" />    
    <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'App',
  components: { SideBar },
}
</script>

<style lang="less">
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';
@import './assets/style/reset.css';

body {
  background: #eee;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  display: flex;
  align-items: stretch;
}
.side-bar {
  height: 98vh;
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
