<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  *, html {
    margin: 0;
    padding: 0;
  }
  .black, .white, .blue {
    background-color: inherit !important;
  }
  .cg-board-wrap {
    width: 500px !important;
    height: 500px !important;
  }
  .cg-board-wrap coords {
    font-size: 20px !important;
  }
</style>