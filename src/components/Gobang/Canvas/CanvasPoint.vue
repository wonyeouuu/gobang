<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import point from '@/mixins/point'

@Component({
  mixins: [point],

  props: {
    context: { required: true },
  },
})
export default class CanvasPoint extends Vue {
  data () {
    return {
      cleanSnapshot: null,
    }
  }

  render () {
    if (!this.$props.context) {
      return
    }

    // reset to original status
    if (this.$data.cleanSnapshot !== null && this.hasNotSet) {
      return this.$props.context.putImageData(
        this.$data.cleanSnapshot,
        this.$props.x - this.$props.radius,
        this.$props.y - this.$props.radius,
      )
    }

    this.drawCircle(this.offset, this.color)

    // save initial render status
    if (this.$data.cleanSnapshot === null) {
      this.$data.cleanSnapshot =
        this.$props.context.getImageData(
          this.$props.x - this.$props.radius,
          this.$props.y - this.$props.radius,
          this.$props.radius * 2 + 1,
          this.$props.radius * 2 + 1,
        )
    }
  }

  drawCircle (radius, color) {
    this.$props.context.beginPath()
    this.$props.context.arc(
      this.$props.x,
      this.$props.y,
      radius,
      0,
      2 * Math.PI,
      true
    )
    this.$props.context.fillStyle = color
    this.$props.context.fill()
    this.$props.context.closePath()
  }
}
</script>
