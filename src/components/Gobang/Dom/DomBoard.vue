<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import board from '@/mixins/board'

@Component({
  mixins: [board],
})
export default class DomBoard extends Vue {
  render () {
    return (
      <div class='domContainer'>
        <div
          class='domBoard'
          style={{
            width: `${this.$props.size}px`,
            height: `${this.$props.size}px`,
          }}
        >
          {this.renderLayout()}
          {this.$scopedSlots.default && this.renderPoints()}
        </div>
      </div>
    )
  }

  renderLayout () {
    const rows = Array(this.$props.dimension + 1).fill(null)
    const cols = Array(this.$props.dimension + 1).fill(null)

    return (
      <div class='domBoard__table'>
        {rows.map((_, row) => (
          <div class='domBoard__row'>
            {cols.map((_, col) => (
              <div class='domBoard__cell' />
            ))}
          </div>
        ))}
      </div>
    )
  }

  renderPoints () {
    const rows = Array(this.$props.dimension).fill(null)
    const cols = Array(this.$props.dimension).fill(null)
    return [
      ...rows.map((_, row) => [
        ...cols.map((_, col) => (
          this.$scopedSlots.default({
            x: (col + 1) * this.gap,
            y: (row + 1) * this.gap,
            state: this.$props.state[row][col],
            radius: Math.min(this.gap, this.gap) / 2.5,
            handleClick: () => {
              this.$emit('move', { row, col })
            },
          })
        )),
      ]),
    ]
  }
}
</script>

<style lang='sass' scoped>
.domContainer
  position: relative

.domBoard
  position: relative
  margin: 0 auto

  &__table
    width: 100%
    height: 100%
    background: #C19A6B;
    display: table
    border-collapse: collapse

  &__row
    display: table-row

  &__cell
    outline: 0.5px solid black
    display: table-cell
</style>
