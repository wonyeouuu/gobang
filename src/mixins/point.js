export default {
  props: {
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

  computed: {
    color () {
      if (this.$props.state === true || this.$props.state === null) {
        return 'black'
      } else if (this.$props.state === false) {
        return 'white'
      }
    },

    hasNotSet () {
      return this.$props.state === null
    },

    offset () {
      return this.hasNotSet
        ? this.$props.radius / 4
        : this.$props.radius
    },
  },
}
