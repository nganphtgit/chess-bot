<template>
<v-layout>
        <v-flex xs6 offset-xs1 >
            <chessboard :fen="currentFen"  @onChangePiece="getFen"/>
        </v-flex>
        <v-flex xs5 offset-xs1>
            <v-layout column class="justify-space-between">
                <v-layout row>
                    <v-flex xs6>
                    <v-card-text>
                    <h3 class="title">Nước cờ</h3>
                </v-card-text>
                    </v-flex>
                    <v-spacer></v-spacer>
                <v-btn class="xs12 mt-2 px-3">Bắt đầu</v-btn>
                </v-layout>
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
              <v-btn-toggle v-model="toggle_exclusive" class="xs12 mt-2">
              <v-btn flat>
                <v-icon>fast_rewind</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon>skip_previous</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon>skip_next</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon>fast_forward</v-icon>
              </v-btn>
            </v-btn-toggle>
            </div>
            <div class="game-information mt-4"></div>
              
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
<style scoped>
.v-btn-toggle {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>