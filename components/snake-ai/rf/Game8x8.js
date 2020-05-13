import React, { Component } from 'react'
import Snake from 'components/snake/rf/Snake'
import Food from 'components/snake/rf/Food'
import 'assets/snake/rf/8x8.css'
import { ucsSnake } from 'plugin/ai/snake-01'
import { SnakeMaster } from 'plugin/ai/rf'

const getRandomCoordinates = () => {
  let min = 2
  let max = 7
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  return [x, y]
}
var timer = null
export const step = 1

const initialState = {
  food: [5, 1],
  speed: 5000,
  direction: 'RIGHT',
  h: 'e',
  snakeDots: [
    [1, 1],
    [2, 1],
    [3, 1]
  ]
}
class Game8x8 extends Component {
  constructor(props) {
    super(props)
    this.moveSnake = this.moveSnake.bind(this)
  }
  state = initialState
  qNet = {}
  async componentDidMount() {
    // timer = setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown
    this.qNet = await SnakeMaster()
  }

  updateSpeed(t) {
    clearInterval(timer)
    // timer = setInterval(this.moveSnake, t)
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders()
    this.checkIfCollapsed()
    this.checkIfEat()
  }

  onKeyDown = (e) => {
    e = e || window.event
    let muteKey = {
      'UP': 40,
      'DOWN': 38,
      'LEFT': 39,
      'RIGHT': 37,
    }
    if(e.keyCode == muteKey[this.state.direction]) {
      return
    }
    switch (e.keyCode) {
      case 40:
        this.setState({ direction: 'UP' })
        break
      case 38:
        this.setState({ direction: 'DOWN' })
        break
      case 37:
        this.setState({ direction: 'LEFT' })
        break
      case 39:
        this.setState({ direction: 'RIGHT' })
        break
    }
  }

  moveSnake = async function() {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]
    let {snakeDots, food, direction} = this.state
    let action =  'RIGHT'
    action = await this.qNet.getNextAction({snake: snakeDots.reverse(), food: [food], direction, h: this.props.h})
    switch (action) {
      case 'RIGHT':
        head = [head[0] + step, head[1]]
        break
      case 'LEFT':
        head = [head[0] - step, head[1]]
        break
      case 'DOWN':
        head = [head[0], head[1] - step]
        break
      case 'UP':
        head = [head[0], head[1] + step]
        break
    }
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if (head[0] >= 9 || head[1] >= 9 || head[0] < 0 || head[1] < 0) {
      // this.onGameOver()
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver()
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    let food = this.state.food
    if (head[0] == food[0] && head[1] == food[1]) {
      this.enlargeSnake()
      this.increaseSpeed()
      this.setState({
        food: getRandomCoordinates()
      })
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      let speed = this.state.speed - 10
      this.setState({
        speed
      })
      this.updateSpeed(speed)
    }
  }


  onGameOver() {
    // alert(`Game Over. Snake length is ${this.state.snakeDots.length}`)
    // this.setState(initialState)
    // this.updateSpeed(initialState.speed)
    console.log('Game over')
  }

  render() {
    return (
      <div className="d-flex justify-content-around mt-2 snake-8x8" id='game'>
        <div>
          <h1>Score: {this.state.snakeDots.length}</h1>
          {/* <h1>Speed: {200 - this.state.speed}</h1> */}
          <button onClick={this.moveSnake}>NEXT</button>
        </div>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
      </div>
    )
  }
}

export default Game8x8
