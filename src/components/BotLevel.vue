<template>
<v-flex xs3>
        <v-slider
          v-model="slider"
          label="Level"
        ></v-slider>
      </v-flex>
</template>

<script>
export default {
    name: 'BotLevel',
    data () {
      return {
        slider: 45
      }
    }
}
</script>

<style scoped>

</style>
