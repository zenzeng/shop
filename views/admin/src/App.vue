<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
  @import "../../../public/css/a/main.css";
  @import "../../../public/css/a/color-dark.css";     /*深色主题*/
  /*@import "../../../public/css/a/theme-green/color-green.css";   浅绿色主题*/
</style>

<!--
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Yes!</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Want something new?'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'Shhh',
        message: 'Just be patient...',
        duration: 6000
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
-->