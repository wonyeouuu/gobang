import clamp from 'ramda/src/clamp'

export default class Gobang {
  /**
   * @param {number} dimension dimension of board
   * @param {boolean} isBlack first player is black or not
   * @param {number} howToWin how many chess in a row to win
   */
  constructor ({
    dimension = 15,
    isBlack = true,
    howToWin = 5,
  } = {}) {
    this.dimension = dimension
    this.howToWin = howToWin
    this.state = Array(dimension)
      .fill(null)
      .map(() => Array(dimension).fill(null))

    this.isBlack = isBlack
    this.isFinished = false
    this.history = []
  }

  add (row, col) {
    this.state[row][col] = this.isBlack
    this.addHistory(row, col, this.isBlack)
    this.isBlack = !this.isBlack
    if (this.isWinningStep(row, col)) {
      this.isFinished = true
    }
  }

  addHistory (row, col, isBlack) {
    this.history = [
      ...this.history,
      {
        row,
        col,
        isBlack: this.isBlack,
      },
    ]
  }

  revert (todo = 1) {
    if (todo < 0) {
      throw new RangeError('revert.count')
    }

    if (this.isFinished || this.history.length === 0) {
      return false
    }

    const moment = this.history[this.history.length - 1]
    this.state[moment.row][moment.col] = null
    this.history = this.history.slice(0, -1)
    this.isBlack = !this.isBlack

    return todo === 1
      ? moment
      : this.revert(todo - 1)
  }

  isWinningStep (row, col) {
    const add = x => x + 1
    const subtract = x => x - 1
    const identity = x => x

    const getCount = (toNextRow, toNextCol) => (
      function _re (row, col, sum = 1) {
        const [nextRow, nextCol] = [
          toNextRow(row),
          toNextCol(col),
        ]
          .map(clamp(0, this.dimension - 1))

        // next point bounded
        if (row === nextRow && col === nextCol) {
          return sum
        }
        return this.state[nextRow][nextCol] === this.state[row][col]
          ? _re.apply(this, [nextRow, nextCol, sum + 1])
          : sum
      }.bind(this)
    )

    return [
      // horizontal
      getCount(identity, add)(row, col) +
      getCount(identity, subtract)(row, col),
      // vertical
      getCount(add, identity)(row, col) +
      getCount(subtract, identity)(row, col),
      // /
      getCount(add, subtract)(row, col) +
      getCount(subtract, add)(row, col),
      // \
      getCount(add, add)(row, col) +
      getCount(subtract, subtract)(row, col),
    ]
      .some(count => count > this.howToWin)
  }
}
