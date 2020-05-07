import * as tf from '@tensorflow/tfjs'

const ACTION_GO_STRAIGHT = 0;
const ACTION_TURN_LEFT = 1;
const ACTION_TURN_RIGHT = 2;

const ALL_ACTIONS = [ACTION_GO_STRAIGHT, ACTION_TURN_LEFT, ACTION_TURN_RIGHT];
const TRANLSLATE_ACTIONS = {
  UP: {
    0: 'UP',
    1: 'LEFT',
    2: 'RIGHT',
  },
  DOWN: {
    0: 'DOWN',
    1: 'RIGHT',
    2: 'LEFT',
  },
  LEFT: {
    0: 'LEFT',
    1: 'DOWN',
    2: 'UP',
  },
  RIGHT: {
    0: 'RIGHT',
    1: 'UP',
    2: 'DOWN',
  },
}

function _getStateTensor(state, h, w) {
  if (!Array.isArray(state)) {
    state = [state];
  }
  const numExamples = state.length;
  // TODO(cais): Maintain only a single buffer for efficiency.
  const buffer = tf.buffer([numExamples, h, w, 2]);

  for (let n = 0; n < numExamples; ++n) {
    if (state[n] == null) {
      continue;
    }
    // Mark the snake.
    state[n].s.forEach((yx, i) => {
      buffer.set(i === 0 ? 2 : 1, n, yx[0], yx[1], 0);
    });

    // Mark the fruit(s).
    state[n].f.forEach(yx => {
      buffer.set(1, n, yx[0], yx[1], 1);
    });
  }
  return buffer.toTensor();
}

export async function SnakeMaster() {
  let qNet = await tf.loadLayersModel('/model.json')
  return {
    getNextAction({ snake, food, direction}) {
      return new Promise((rs, rj) => {
        tf.tidy(() => {
          const state = {
            s: snake,
            f: food
          }
          const stateTensor = _getStateTensor(state, 8, 8);
          const predictOut = qNet.predict(stateTensor);
          let currentQValues = predictOut.dataSync();
          let bestAction = ALL_ACTIONS[predictOut.argMax(-1).dataSync()[0]]
          // console.log([ currentQValues ]);
          console.log(TRANLSLATE_ACTIONS[direction][bestAction])
          console.log(bestAction)
          rs(TRANLSLATE_ACTIONS[direction][bestAction])
        })
      })
    }
  }
}