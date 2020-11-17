<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo text-center" mode="horizontal" @select="handleSelect">
      <el-menu-item index="home">Доска</el-menu-item>
      <el-menu-item index="users">Сотрудники</el-menu-item>
    </el-menu>
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {},
    data: function () {
      return {
        activeIndex: "home"
      }
    },
    methods: {
      handleSelect(key) {
        this.$router.push({ name: key })
      }
    },
    mounted() {
      this.activeIndex = this.$route.name
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .el-menu-demo {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      float: none !important;
    }
  }
</style>
