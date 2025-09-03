<template>
  <div id="app">
    <header class="header">
      <!-- 删除: <img src="./src/assets/images/logo.png" alt="网站logo" class="logo"> -->
      <h1>欢迎来到我们的网站</h1>
    </header>
    <main>
      <!-- 主要内容 -->
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 删除:.logo {
  height: 60px;
  width: auto;
} */
</style>

