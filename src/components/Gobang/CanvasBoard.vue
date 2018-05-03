<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import clamp from 'ramda/src/clamp'

@Component({
  props: {
    state: {
      type: Array,
      required: true,
    },

    dimension: {
      type: Number,
      default: 15,
    },

    size: {
      type: Number,
      default: 500,
    },
  },
})
export default class CanvasBoard extends Vue {
  data () {
    return {
      context: null,
    }
  }

  get gap () {
    return this.$props.size / (this.$props.dimension + 1)
  }

  render () {
    return (
      <div>
        <canvas
          ref='canvas'
          width={this.$props.size}
          height={this.$props.size}
          onClick={this.handleOnClick}
        />
        {this.$scopedSlots.default && this.renderPoints()}
      </div>
    )
  }

  mounted () {
    this.$data.context = this.$refs.canvas.getContext('2d')
    this.initLayout()
  }

  initLayout () {
    const ctx = this.$data.context
    ctx.beginPath()

    Array(this.$props.dimension + 1)
      .fill(null)
      .forEach((_, index) => {
        // draw vertical
        ctx.moveTo(this.gap * index, 0)
        ctx.lineTo(this.gap * index, this.$props.size)
        // draw horizontal
        ctx.moveTo(0, this.gap * index)
        ctx.lineTo(this.$props.size, this.gap * index)
      })

    ctx.closePath()
    ctx.stroke()
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
            context: this.$data.context,
            radius: Math.min(this.gap, this.gap) / 2.5,
          })
        )),
      ]),
    ]
  }

  handleOnClick (e) {
    const x = e.pageX - this.$refs.canvas.offsetLeft
    const y = e.pageY - this.$refs.canvas.offsetTop
    const calculateClick = pos => (
      clamp(0, this.$props.dimension - 1)(
        Math.round(pos / this.gap) - 1,
      )
    )
    const row = calculateClick(y)
    const col = calculateClick(x)

    this.$props.state[row][col] === null && (
      this.$emit('move', { row, col })
    )
  }
}
</script>

<style>
canvas {
  border: 1px solid black;
  background: #C19A6B;
}
</style>
