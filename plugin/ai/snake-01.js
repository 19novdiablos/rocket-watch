var queue = require('queue')


// input: { snake, food, direction }
// output: UP | DOWN | LEFT | RIGHT
function bfsSnake({ snake, food, direction }) {
  let q = queue(),
    rooStatus = getNodeWithChild({ snake, food, direction, parents: null, log: false })

  q.push(rooStatus)
  while (q.length) {
    let item = q.pop(),
      currentSnakeHead = item.status.snake[0]
    if(isEqual(currentSnakeHead, food)) {
      return item
    }
    let nextStatusArray = getNodeWithChild({ 
      snake: (item.status || {}).snake,
      food: (item.status || {}).food,
      direction: (item.status || {}).direction,
      parents: rooStatus,
      log: true,
    })
    nextStatusArray.childs.forEach(child => {
      if(!child.childs) {
        child.childs = getNodeWithChild({ 
          snake: (child.status || {}).snake,
          food: (child.status || {}).food,
          direction: (child.status || {}).direction,
          parents: rooStatus,
          log: true,
        })
      }
      q.push(child)
    })
  }
  return 'UP'
}
function isEqual(point01, point02) {
  return point01[0] === point02[0] && point01[1] === point02[1]
}

function getNodeWithChild({ snake, food, direction, parents, log }) {
  let headSnake = snake[0]
  let array = []
  
  if (headSnake[0] + 1 <= 99) {
    array.push({
      head: [headSnake[0] + 1, headSnake[1]],
      parents: { snake, food, direction },
    })
  }
  if (headSnake[0] - 1 >= 0) {
    array.push({
      head: [headSnake[0] - 1, headSnake[1]],
      parents: { snake, food, direction },
    })
  }
  if (headSnake[1] + 1 <= 99) {
    array.push({
      head: [headSnake[0], headSnake[1] + 1],
      parents: { snake, food, direction },
    })
  }
  if (headSnake[1] - 1 >= 0) {
    array.push({
      head: [headSnake[0], headSnake[1] - 1],
      parents: { snake, food, direction },
    })
  }
  if(log) {
    console.log(headSnake)
    console.log('\n')
  }
  let childs = array.map(item => {
      let newSnake = snake.slice()
      newSnake[0] = item.head
      if(log) {
        console.log(newSnake)
      }
      return {
        status: {
          snake: newSnake,
          food,
          direction,
        },
        parents: item.parents,
        childs: null
      }
    }
  )
  if(log) {
    console.log('--------------------')
  }

  return {
    status: { snake, food, direction },
    parents,
    childs,
  }
}

var food = [4, 9]
var direction = 'RIGHT'
var snakeDots =  [[4, 8], [1, 0]]
console.log(bfsSnake({ snake: snakeDots, food, direction }))