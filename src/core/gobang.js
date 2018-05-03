import clamp from 'ramda/src/clamp'

export default class Gobang {
  constructor ({ dimension = 15, isBlack = true } = {}) {
    this.dimension = dimension
    this.state = Array(dimension)
      .fill(null)
      .map(() => Array(dimension).fill(null))

    this.isBlack = isBlack
    this.isFinished = false
  }

  add (row, col) {
    this.state[row][col] = this.isBlack
    this.isBlack = !this.isBlack
    if (this.isWinningStep(row, col)) {
      this.isFinished = true
    }
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
      .some(count => count > 5)
  }
}
