export default class Gobang {
  constructor ({ row = 15, col = 15, isBlack = true } = {}) {
    this.row = row
    this.col = col
    this.state = Array(row)
      .fill(null)
      .map(() => Array(col).fill(null))

    this.isBlack = isBlack
    this.isFinished = false
  }

  add (row, col) {
    this.state[rol][col] = this.isBlack
    this.isBlack = !this.isBlack
  }
}
