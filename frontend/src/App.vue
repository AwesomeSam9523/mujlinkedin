<template>
  <router-view :key="$route.path"></router-view>
  <widget-container-modal />
</template>

<script>
import { RouterView } from 'vue-router';
import { container } from "jenesius-vue-modal";

export default {
  name: 'App',
  components: {
    RouterView,
    WidgetContainerModal: container,
  },
  created: function () {
    console.log('App created');
  },
}
</script>

<style lang="scss">
@import "~@/assets/styles";
@import url('https://fonts.googleapis.com/css2?family=PT+Mono&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #fff;
  display: flex;
}

</style>
