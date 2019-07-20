<template>
  <v-container>
    <v-flex xs12>
      <game-board></game-board>
    <!-- <clock></clock>
    <bot-level></bot-level> -->
    </v-flex>
  </v-container>
</template>

<script>
  import GameBoard from '../components/GameBoard' 
  import Clock from '../components/Clock'
  import BotLevel from '../components/BotLevel'

  export default {
    components: {
      GameBoard,
      Clock,
      BotLevel
    }
  }
</script>
