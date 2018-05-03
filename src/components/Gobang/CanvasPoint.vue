<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    context: { required: true },

    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },

    radius: {
      type: Number,
      required: true,
    },

    state: { required: true },
  },
})
export default class CanvasPoint extends Vue {
  get color () {
    if (this.$props.state === true || this.$props.state === null) {
      return 'black'
    } else if (this.$props.state === false) {
      return 'white'
    }
  }

  get hasNotSet () {
    return this.$props.state === null
  }

  render () {
    if (!this.$props.context) {
      return
    }
    const radius = this.hasNotSet
      ? this.$props.radius / 5
      : this.$props.radius

    this.$props.context.beginPath()
    this.$props.context.arc(
      this.$props.x,
      this.$props.y,
      radius,
      0,
      2 * Math.PI,
      true
    )
    this.$props.context.fillStyle = this.color
    this.$props.context.fill()
    this.$props.context.closePath()
  }
}
</script>
