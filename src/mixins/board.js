export default {
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
      default: 480,
    },
  },

  computed: {
    gap () {
      return this.$props.size / (this.$props.dimension + 1)
    },
  },
}
