const given = require('./given-data')
const answer = require('./answer-data')

export function getLevelData(level) {
  return new Promise(function(resolve) {
    resolve({ data: given[level - 1] })
  })
}

export function getAnswerData(level) {
  return new Promise(function(resolve) {
    resolve({ data: answer[level - 1] })
  })
}
