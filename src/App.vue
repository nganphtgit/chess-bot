<template>
  <div>
    <Header/>
    <div id="app">
    <router-view />
  </div>
  <Footer/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  *, html {
    margin: 0;
    padding: 0;
  }
  .black, .white, .blue {
    background-color: inherit !important;
  }
</style>