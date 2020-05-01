module.exports = {
  bfsSnake,
}

var PriorityQueue = require('js-priority-queue/priority-queue')
import { step } from 'components/snake/GameAutoPlay'
// input: { snake, food, direction }
// output: UP | DOWN | LEFT | RIGHT
function bfsSnake({ snake, food, direction }) {
  let q = new PriorityQueue({
      comparator: function(a, b) {
        return a.priority - b.priority
      }
    }),
    rooStatus = getNodeWithChild({ snake, food, direction, parents: null, log: false })

  q.queue(rooStatus)
  while (q.length) {
    let item = q.dequeue(),
      currentSnakeHead = item.status.snake[item.status.snake.length - 1]
    if(isEqual(currentSnakeHead, food)) {
      return getDerectTion(item)
    }
    let nextStatusArray = getNodeWithChild({ 
      snake: (item.status || {}).snake,
      food: (item.status || {}).food,
      direction: (item.status || {}).direction,
      parents: item,
      log: true,
    })
    nextStatusArray.childs.forEach(child => {
      if(!child.childs) {
        child.childs = getNodeWithChild({ 
          snake: (child.status || {}).snake,
          food: (child.status || {}).food,
          direction: (child.status || {}).direction,
          parents: child,
          log: true,
        })
      }
      q.queue(child)
    })
  }
  return null
}

function getPriority(point01, point02) {
  let a = Math.abs(point01[0] - point02[0]),
    b = Math.abs(point01[1] - point02[1])
  return a + b
}
function isEqual(point01, point02) {
  return point01[0] === point02[0] && point01[1] === point02[1]
}

function getNodeWithChild({ snake, food, direction, parents, log }) {
  let headSnake = snake[snake.length - 1]
  let array = []
  
  if (headSnake[0] + step <= 99) {
    array.push({
      head: [headSnake[0] + step, headSnake[1]],
      parents: { snake, food, direction },
      direction: 'RIGHT',
    })
  }
  if (headSnake[0] - step >= 0) {
    array.push({
      head: [headSnake[0] - step, headSnake[1]],
      parents: { snake, food, direction },
      direction: 'LEFT',
    })
  }
  if (headSnake[1] + step <= 99) {
    array.push({
      head: [headSnake[0], headSnake[1] + step],
      parents: { snake, food, direction },
      direction: 'DOWN',
    })
  }
  if (headSnake[1] - step >= 0) {
    array.push({
      head: [headSnake[0], headSnake[1] - step],
      parents: { snake, food, direction },
      direction: 'UP',
    })
  }
  let childs = array.map(item => {
      let newSnake = snake.slice()
      newSnake[newSnake.length - 1] = item.head
      return {
        status: {
          snake: newSnake,
          food,
          direction: item.direction,
        },
        parents,
        priority: getPriority(newSnake[newSnake.length - 1], food),
        childs: null
      }
    }
  )

  return {
    status: { snake, food, direction },
    parents,
    priority: getPriority(snake[snake.length - 1], food),
    childs,
  }
}

function getDerectTion(node) {
  let array = []
  let obj = Object.assign({}, node)
  while(obj.parents) {
    array.push(obj)
    obj = Object.assign({}, obj.parents)
  }
  return array[array.length - 1]
}

// var food = [80, 2]
// var direction = 'RIGHT'
// var snakeDots =  [[10, 0]]
// bfsSnake({ snake: snakeDots, food, direction })