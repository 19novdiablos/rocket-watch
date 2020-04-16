import React, { Component } from 'react';
import Snake from 'components/snake/Snake';
import Food from 'components/snake/Food';
import 'assets/snake/index.css';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y]
}
var timer = null

const initialState = {
    food: getRandomCoordinates(),
    speed: 200,
    direction: 'RIGHT',
    snakeDots: [
        [0, 0],
        [2, 0]
    ]
}

class Game extends Component {

    state = initialState;

    componentDidMount() {
        timer = setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
    }

    componentDidUpdate() {
        this.checkIfOutOfBorders();
        this.checkIfCollapsed();
        this.checkIfEat()
    }

    onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                this.setState({ direction: 'UP' });
                break;
            case 40:
                this.setState({ direction: 'DOWN' });
                break;
            case 37:
                this.setState({ direction: 'LEFT' });
                break;
            case 39:
                this.setState({ direction: 'RIGHT' });
                break;
        }
    }

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];

        switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({
            snakeDots: dots
        })
    }

    checkIfOutOfBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.onGameOver();
        }
    }

    checkIfCollapsed() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] == dot[0] && head[1] == dot[1]) {
                this.onGameOver();
            }
        })
    }

    checkIfEat() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if (head[0] == food[0] && head[1] == food[1]) {
            console.log('Eating')
            this.enlargeSnake();
            this.increaseSpeed();
            this.setState({
                food: getRandomCoordinates()
            })
        }
    }

    enlargeSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([])
        this.setState({
            snakeDots: newSnake
        })
    }

    increaseSpeed() {
        if (this.state.speed > 50) {
            let speed = this.state.speed - 30
            this.setState({
                speed
            })
            this.updateSpeed(speed)
        }
    }
    
    updateSpeed(t) {
        clearInterval(timer)
        timer = setInterval(this.moveSnake, t)
    }

    onGameOver() {
        alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
        this.setState(initialState)
        this.updateSpeed(initialState.speed)
    }

    render() {
        return (
            <div className="d-flex justify-content-around mt-2">
                <div>
                    <h1>Score: {this.state.snakeDots.length}</h1>
                <h1>Speed: X{(200 - this.state.speed + 30)/30}</h1>
                </div>
                <div className="game-area">
                    <Snake snakeDots={this.state.snakeDots} />
                    <Food dot={this.state.food} />
                </div>
            </div>
        );
    }
}

export default Game;
