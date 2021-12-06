<template>
  <div id="app">
      <div class="nav">         
          <router-link to="/">Таблица с пагинацией</router-link>
          <router-link to="/infinity">Бесконечный скролл</router-link>
          <router-link to="/virtual">Виртуальный скролл</router-link>
      </div>        
      <router-view />        
  </div>
</template>

<script>

export default {
  name: 'App'
}
  
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {margin-bottom: 20px;}
.nav a { margin: 0px 5px;}

</style>
