<script>
import Vue from 'vue'
import Component from 'vue-class-component'

/**
 * Responsible for choosing render mechanism.
 */
@Component({
  props: {
    state: {
      type: Array,
      required: true,
    },
  },
})
export default class GobangContainer extends Vue {
  render () {
    return this.$scopedSlots.default({
      state: this.$props.state,
    })
  }
}
</script>
