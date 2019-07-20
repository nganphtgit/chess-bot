<template>
<v-layout>
        <v-flex xs6 offset-xs1 >
            <chessboard :fen="currentFen"  @onChangePiece="getFen"/>
        </v-flex>
        <v-flex xs5 offset-xs1>
            <v-layout column>
                <div class="move-history-content">
              <div v-for="(item, index) in moveHistory" :key="index">
                <div class="index">{{ item.index }}</div>
                <div
                  :id="item.whiteMove.moveCount"
                  class="move"
                  @click="loadFen(item.whiteMove.fen, $event)"
                >{{ item.whiteMove.move }}</div>
                <div
                  v-if="item.blackMove"
                  :id="item.blackMove.moveCount"
                  class="move"
                  @click="loadFen(item.blackMove.fen, $event)"
                >{{ item.blackMove.move }}</div>
              </div>
            </div>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import chessboard from '@/components/vue-chessboard/index'
export default {
    name: 'GameBoard',
    components: {
        chessboard
    },
    data() {
        return {
            move: '',
            currentFen: ''
        }
    },
    methods: {
        getFen(data) {
            console.log(data)
            this.testFen = data
        },
        showInfo() {
            this.move= 'e7e5'
        },
        loadFen(fen) {
            console.log(fen)
      this.currentFen = fen
    },
    },
    created() {
        this.fens = ['3B1B1B/p7/7B/8/7B/8/k1K5/8 w - - 0 1',
                'r4rk1/pp1b3p/6p1/8/3NpP2/1P4P1/P2K3P/R6R w - - 0 22'
                ]
    }
}
</script>

<style scoped src="@/assets/style/chessboard.css">

</style>
