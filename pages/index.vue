<template>
  <div class="container text-center">
    <h1>
      4 PICS 1 WORD
    </h1>
    <br>
    <br>
    <br>
    <button @click.prevent="start">
      START GAME
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      this.$router.push('level/1')
    }
  }
}
</script>
