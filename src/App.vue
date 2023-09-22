<template>
  <div id="app">
    <!-- <Title></Title> -->
    <router-view />
  </div>
</template>

<script>
import Title from './components/hearder'
export default {
  components: { Title }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app,
body,
* {
  padding: 0;
  border: 0;
  margin: 0;
}
</style>
