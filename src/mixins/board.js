export default {
  props: {
    state: {
      type: Array,
      required: true,
    },

    dimension: {
      type: Number,
      required: true,
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
