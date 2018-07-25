<template>
  <section class="container">
    <div class="d-flex flex-column">
      <br>
      <div class="row">
        <div class="col-md-6" v-for="(pic, index) in pics" :key="`pic-${index}`">
          <div class="panel panel-default">
            <img :src="pic" alt="pic" class="img-responsive" style="width: 100%; margin-bottom: 10px;  height: 225px;">
          </div>
        </div>
      </div>
      <div class="row  justify-content-center">
        <template v-for="(item, index) in answer">
          <button style="border-style: solid; border-color: green; padding: 10px; margin: 8px; width: 100px; height: 100px;  cursor: pointer;" class="col" :key="`letter-${index}`" @click.prevent="removeLetter(item.index)">
            <span style="font-size: 50px">{{ item.letter }} </span>
          </button>
        </template>
      </div>

      <br>
      <br>
      <div class="row">
        <div class="col" v-for="(letter, index) in jumbledWord" :key="`letter-${index}`">
          <button style="border-style: solid; border-color: red; margin-bottom: 5px; width: 100px; height: 100px;" @click.prevent="pushLetter(letter, index)" :disabled="letter.inputted" :style="letter.inputted ? 'cursor: not-allowed;' : 'cursor: pointer;'">
            <span style="font-size: 50px">{{ !letter.inputted ? letter.letter : '' }}</span>
          </button>
        </div>
      </div>
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
    answer: {
      handler: function(value) {
        const isNotComplete = value.find(item => {
          return item.letter === null
        })

        // If answer is filled up, submit answer
        if (!isNotComplete) {
          this.submitAnswer()
        }
      },
      deep: true
    }
  },
  methods: {
    initialize() {
      let level = parseInt(this.$route.path.split('/').pop())
      const getLevelData = api.getLevelData(level)
      const getAnswerData = api.getAnswerData(level)

      Promise.all([getLevelData, getAnswerData]).then(([level, answer]) => {
        // If no more levels
        if (level.data === undefined) {
          alert('Congratulations on completing this game!')
          this.$router.push('/')
        }

        this.pics = level.data.pics
        this.jumbledWord = level.data.jumbledWord

        // Create answer boxes based on answer length
        for (var i = 0; i < answer.data.length; i++) {
          this.answer.push({ letter: null, index: null })
        }
      })
    },
    pushLetter(letter, index) {
      this.jumbledWord[index].inputted = true

      // Iterate from start and check for null item letter
      for (let i = 0; i < this.answer.length; i++) {
        // Check if object letter property is null
        if (this.answer[i].letter === null) {
          // Assign letter to answer item object letter property
          this.answer[i].letter = this.jumbledWord[index].letter
          // Assign index as reference for removal
          this.answer[i].index = index
          // Stop the iteration
          break
        }
      }
    },
    removeLetter(index) {
      this.jumbledWord[index].inputted = false
      let answer = this.answer.find(item => item.index === index)
      answer.letter = null
      answer.index = null
    },
    submitAnswer() {
      // Get right answer
      let rightAnswer = ''
      api.getAnswerData(this.$route.path.split('/').pop()).then(response => {
        rightAnswer = response.data

        console.log(rightAnswer)
        // Create letter
        let answer = ''
        this.answer.forEach(item => (answer += item.letter))

        if (answer === rightAnswer) {
          alert('Level complete!')

          // Go to next level
          this.$nextTick(() => {
            this.$router.push(
              `/level/${parseInt(this.$route.path.split('/').pop()) + 1}`
            )
          })
        } else {
          alert('Wrong!')
        }
      })
    }
  }
}
</script>
