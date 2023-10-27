<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  
  <router-view />
  
  
</template>

<script>


export default {
  name: 'App',
  create() {
  },
  beforeMount() {
    // 마운트 시점에 데이터 세팅
    this.$store.commit('setState');
  },
  methods: {
  },
  components: {
  },
}
</script>

<style>
/* @import ""; */
@import "../src/assets/css/general.css";
@import "./assets/css/general.css";
</style>
