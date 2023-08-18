<template>
  <div id="app">
    <img src="./assets/header.png" style="width: 100%;height: 100px;" />
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app,
body,
* {
  padding: 0;
  border: 0;
  margin: 0;
}</style>
