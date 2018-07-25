<template>
  <section class="container">
    <br>
    <div class="row">
      <div class="col-md-6" v-for="(pic, index) in pics" :key="`pic-${index}`">
        <div class="panel panel-default">
          <img :src="pic" alt="pic" class="img-responsive" style="width: 100%; padding: 0;">
        </div>
      </div>
    </div>
    <div class="row">
      <label>ANSWER</label>
      <button style="border-style: solid; border-color: green; padding: 10px; margin: 8px;" v-for="(letter, index) in answer" :key="`letter-${index}`" @click.prevent="removeLetter(letter, index)">
        {{ letter.letter }}
      </button>
    </div>

    <br>
    <br>
    <div class="row">
      <label>CHOICES</label>
      <button style="border-style: solid; border-color: red; padding: 10px; margin: 8px;" v-for="(letter, index) in jumbledWord" :key="`letter-${index}`" @click.prevent="pushLetter(letter, index)" :disabled="letter.inputted">
        {{ letter.letter }}
      </button>
    </div>
  </section>
</template>

<script>
import * as api from '@/api'
export default {
  data() {
    return {
      pics: [],
      answer: [],
      jumbledWord: []
    }
  },
  mounted() {
    this.initialize()
  },
  watch: {
    answer(value) {
      if (value.length === this.jumbledWord.length) {
        this.submitAnswer()
      }
    }
  },
  methods: {
    initialize() {
      api.getPic(this.$axios).then(response => {
        this.pics = response.data.pics
        this.jumbledWord = response.data.jumbledWord
      })
    },
    pushLetter(letter, index) {
      this.jumbledWord[index].inputted = true
      letter.index = index
      this.answer.push(letter)
    },
    removeLetter(letter, index) {
      this.jumbledWord[letter.index].inputted = false
      this.answer.splice(index, 1)
    },
    submitAnswer() {
      let answer = ''
      let rightAnswer = 'eco'
      this.answer.forEach(letter => (answer += letter.letter))

      if (answer === rightAnswer) {
        alert('Correct!')
      } else {
        alert('Wrong!')
      }
    }
  }
}
</script>
