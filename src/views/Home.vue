<template>
  <div class="home">
    <chessboard/>
  </div>
</template>

<script>
// @ is an alias to /src
import {chessboard} from "vue-chessboard";

export default {
  name: "home",
  components: {
    chessboard
  }
};
</script>
