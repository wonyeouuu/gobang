<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    state: {
      type: Array,
      // required: true,
      default: () => [],
    },

    row: {
      type: Number,
      default: 15,
    },

    col: {
      type: Number,
      default: 15,
    },

    width: {
      type: Number,
      default: 500,
    },

    height: {
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

  render () {
    return (
      <canvas width={this.$props.width} height={this.$props.height} />
    )
  }

  mounted () {
    this.$data.context = this.$el.getContext('2d')
    this.initLayout()
  }

  initLayout () {
    const ctx = this.$data.context

    Array(this.$props.row)
      .fill(null)
      .forEach((_, index) => {
        const gap = this.$props.height / this.$props.row
        ctx.beginPath()
        ctx.moveTo(gap * index, 0)
        ctx.lineTo(gap * index, this.$props.height)
        ctx.closePath()
        ctx.stroke()
      })

    Array(this.$props.col)
      .fill(null)
      .forEach((_, index) => {
        const gap = this.$props.width / this.$props.col
        ctx.beginPath()
        ctx.moveTo(0, gap * index)
        ctx.lineTo(this.$props.width, gap * index)
        ctx.closePath()
        ctx.stroke()
      })
  }
}
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
