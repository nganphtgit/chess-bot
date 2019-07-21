<template>
  <v-layout>
    <v-flex xs6 offset-xs1>
      <chessboard :viewOnly="viewOnly" :fen="currentFen" :move="move" @onMove="showInfo" />
    </v-flex>
    <v-flex xs5 offset-xs1>
      <v-layout column class="justify-space-between">
        <v-layout row>
          <v-flex xs5>
          <Player :time="botTime" />
        </v-flex>
        <v-btn :disabled="isStart" @click="startDialog = true" icon flat class="btn-start mt-2 ml-3">
          <v-icon>add_circle</v-icon>
        </v-btn>
        </v-layout>
        <div class="move-history-content">
            <div v-for="(item, index) in moveHistory" :key="index">
                <div class="index">{{ item.index }}</div>
                <div
                  :id="item.whiteMove.moveCount"
                  class="move"
                >{{ item.whiteMove.move }}</div>
                <div
                  v-if="item.blackMove"
                  :id="item.blackMove.moveCount"
                  class="move"
                >{{ item.blackMove.move }}</div>
          </div>
        </div>
        <div class="xs12 btn-group-move">
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
          </div>
        <div class="game-information mt-1 ">
          <div class="game-information-item" v-for="(item, index) in gameHistory" :key="index">
                <div class="game-details"
                >Ván: {{ index + 1 }} - Bot: {{item.skillLevel}}:{{item.depth}} - {{item.color}} - Thời gian: {{item.time}}</div>
                <div class="game-result" v-if="item.result !== null">{{item.result}}</div>
          </div>
        </div>
          <v-flex xs6 mt-2>
          <Player :time="playerTime" />
        </v-flex>
      </v-layout>
      <v-dialog v-model="startDialog" persistent max-width="600px">
        <v-card>
          <v-toolbar card>
            <span class="headline">Ván đấu mới</span>
          </v-toolbar>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <p class="font-weight-medium my-2">Cấp độ</p>
                <v-slider
                  v-model="level"
                  step="1"
                  :tick-labels="tickLabels"
                  ticks="always"
                  :min="1"
                  :max="20"
                  tick-size="2"
                  color="indigo"
                  class="mt-1"
                  hide-details
                ></v-slider>
              </v-flex>
              <v-flex xs12>
                <p class="font-weight-medium my-2">Độ sâu</p>
                <v-slider
                  v-model="depth"
                  step="1"
                  :tick-labels="tickLabels"
                  ticks="always"
                  :min="1"
                  :max="20"
                  tick-size="2"
                  color="indigo"
                  class="mt-1"
                  hide-details
                ></v-slider>
              </v-flex>
              <v-flex xs7>
                <p class="font-weight-medium my-2">Chọn màu quân (mặc định ngẫu nhiên)</p>
                <v-btn-toggle v-model="colorPicker">
                  <v-btn :value="1" style="width: 100px" class="white king pick-color pa-1"></v-btn>
                  <v-btn :value="2" style="width: 100px" class="king black pick-color pa-1"></v-btn>
                </v-btn-toggle>
              </v-flex>
              <v-flex xs5>
                <v-dialog
                  ref="dialog"
                  v-model="timePicker"
                  :return-value.sync="time"
                  persistent
                  lazy
                  full-width
                  width="300px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Chọn thời gian đấu"
                      prepend-icon="alarm"
                      readonly
                      v-on="on"
                      class="mt-4"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timePicker"
                    v-model="time"
                    format="24hr"
                    full-width
                    min="00:01:00"
                    max="12:59:59"
                    use-seconds
                    scrollable
                    :allowed-hours="allowedHours"
                    :allowed-minutes="allowedMinutes"
                    :allowed-seconds="allowedSeconds"
                    color="indigo"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="timePicker = false">Đóng</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <!-- <v-flex xs12>
                    <v-switch
                      v-model="ex11"
                      label="Dùng chế độ gợi ý nước đi"
                      color="primary"
                      value="indigo"
                      hide-details
                    ></v-switch>
              </v-flex>-->
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="startDialog = false">Đóng</v-btn>
            <v-btn color="blue darken-1" flat @click="startGame">Bắt đầu</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import chessboard from "@/components/vue-chessboard/index";
import Player from "@/components/PlayChess/Player";
import { setInterval, clearInterval } from "timers";
export default {
  name: "GameBoard",
  components: {
    chessboard,
    Player
  },
  data() {
    return {
      move: "",
      moves: [],
      gameHistory: [],
      currentFen: "",
      defaultFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      startDialog: true,
      level: 3,
      depth: 3,
      colorPicker: 0,
      tickLabels: [],
      time: "01:00:00",
      timePicker: false,
      toggle_exclusive: -1,
      botTime: "01:00:00",
      playerTime: "01:00:00",
      viewOnly: true,
      isStart: false,
      moveHistory: [],
      currentMove: 0,
      totalMove: 0,
      interval: null,
      currentGame: {},
      turn: '',
      userColor: ''
    };
  },
  watch: {
    turn: function(turn) {
      this.turn = turn
      clearInterval(this.interval)
      if (this.turn != null) {
        this.interval = setInterval(this.runClock, 1000)
      }
      if (this.turn !== this.userColor && this.isStart) {
        this.calculateMove()
      }
    },
  },
  updated() {
    this.setCurrentMove()
  },
  methods: {
    getFen(data) {
      console.log(data);
      this.testFen = data;
    },
    showInfo(data) {
      this.moves = data.hisMoves
      const black = 'black'
      let moveHistory = this.moveHistory
      let newMove = data.history[data.history.length - 1]
      let lastMove = moveHistory[moveHistory.length - 1]
      if (newMove === undefined || !this.currentFen) return
      if (data.end_game) {
        this.isStart = false
      }
      this.turn = data.turn
      this.totalMove++
      if (this.turn === black) {
        const newTurn = {
          index: moveHistory.length + 1,
          whiteMove: {
            move: newMove,
            fen: data.fen,
            moveCount: 'move-' + this.totalMove
          },
          blackMove: null
        }
        moveHistory.push(newTurn)
      } else {
        //nước đi tiếp theo của turn cũ
        lastMove.blackMove = {
          move: newMove,
          fen: data.fen,
          moveCount: 'move-' + this.totalMove
        }
      }
      this.currentMove = this.totalMove
      console.log(data.fen)
    },
    setCurrentMove() {
      //set highlight div dựa trên this.current move hiện tại
      let arr = document.getElementsByClassName('move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('current-move')
        })
        let currentMove = document.getElementById('move-' + this.currentMove)
        currentMove.classList.add('current-move')
        currentMove.parentNode.parentNode.scrollTop = currentMove.offsetTop
      }
    },
    loadFen(fen) {
      console.log(fen);
      this.currentFen = fen;
    },
    resetBoard() {
      this.moveHistory = [];
      this.moves = "";
      this.currentFen = this.defaultFen;
      this.currentMove = 0;
      this.totalMove = 0;
      clearInterval(this.interval);
    },
    runClock() {
      if (this.isStart) {
        this.userColor === this.turn
          ? (this.playerTime = this.countDownTime(this.playerTime))
          : (this.botTime = this.countDownTime(this.botTime));
      }
    },
    startGame() {
      this.resetBoard();
      this.turn = 'white';
      switch (this.colorPicker) {
        case 0:
          this.userColor = "white";
          break;
        case 1:
          this.userColor = "white";
          break;
        case 2:
          this.userColor = "black";
          break;
      }
      this.botTime = this.playerTime = this.time
      this.startDialog = false
      this.isStart = true
      this.viewOnly = false
      this.interval = setInterval(this.runClock, 1000);
      this.currentGame = {
        color: this.userColor === 'white' ? 'Trắng' : 'Đen',
        time: this.time,
        depth: this.depth,
        skillLevel: this.level,
        result: null
      }
      this.gameHistory.push(this.currentGame)
    },
    countDownTime(time) {
      const timeArr = time.split(':')
      let hour = parseInt(timeArr[0]),
        min = parseInt(timeArr[1]),
        second = parseInt(timeArr[2])
      if (second != 0 || min != 0 || hour != 0) {
        if (second > 0) {
          second--
        } else {
          if (min > 0) {
            min--
            second = 59
          } else {
            //hour > 0, min = 0
            min = 59
            hour--
            second = 59
          }
        }
      } else {
        clearInterval(this.interval)
        this.isStart = false
        return '00:00:00'
      }
      hour < 10 ? (hour = '0' + hour) : hour
      min < 10 ? (min = '0' + min) : min
      second < 10 ? (second = '0' + second) : second
      return hour + ':' + min + ':' + second
    },
    allowedHours: v => v >= 0 && v <= 12,
    allowedMinutes: v => v >= 1 && v <= 60,
    allowedSeconds: v => v >= 0 && v <= 60,
    sendUCI(str) {
      this.engine.postMessage(str)
    },
    calculateMove() {
      let self = this
      this.sendUCI('setoption name Skill Level value ' + this.level)
      console.log(this.moves)
      this.sendUCI('position startpos moves' + this.moves)
      this.sendUCI('go depth ' + this.depth)
      this.engine.onmessage = function(event) {
        console.log(event.data)
        let line = event.data
        if (event.data.indexOf('bestmove') > -1) {
          let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/)
          match[3] == undefined
            ? (self.move = match[1] + match[2])
            : (self.move = match[1] + match[2] + match[3])
        }
      }
    }
  },
  created() {
    this.fens = [
      "3B1B1B/p7/7B/8/7B/8/k1K5/8 w - - 0 1",
      "r4rk1/pp1b3p/6p1/8/3NpP2/1P4P1/P2K3P/R6R w - - 0 22"
    ];
    for (let i = 0; i < 20; i++) {
      this.tickLabels[i] = i + 1;
    }
    this.engine = new Worker('stockfish.js')
    this.sendUCI('uci')
  }
};
</script>

<style scoped src="@/assets/style/chessboard.css">
</style>
<style scoped>
.btn-group-move .v-btn {
  width: 25%;
}
.layout {
  font-family: "Poppins", sans-serif;
}
</style>