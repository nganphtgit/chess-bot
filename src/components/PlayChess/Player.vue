<template>
  <v-layout row mb-2>
    <v-card height="50">
      <div class="time display-1">
        <p class="text-xs-center pb-1 pt-1 pl-3 pr-3">
          <span class="hour">{{ timeArr[0] }}</span
          >:<span class="minnute">{{ timeArr[1] }}</span
          >:<span class="second">{{ timeArr[2] }}</span>
        </p>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'Player',
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeArr: []
    }
  },
  watch: {
    time: function(time) {
      this.time = time
      this.timeArr = this.time.split(':')
    }
  },
  created() {
    this.timeArr = this.time.split(':')
  }
}
</script>

<style scoped>
.layout {
  margin-bottom: 8px;
}
</style>
