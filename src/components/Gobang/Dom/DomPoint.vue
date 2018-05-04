<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import point from '@/mixins/point'

@Component({
  mixins: [point],
})
export default class DomPoint extends Vue {
  render () {
    const px = value => value + 'px'

    return (
      <div
        class='domPoint'
        style={{
          left: px(this.$props.x - this.offset - this.$props.radius),
          top: px(this.$props.y - this.offset - this.$props.radius),
          width: px(this.offset * 2),
          height: px(this.offset * 2),
          padding: px(this.$props.radius),
          backgroundColor: this.color,
        }}
      />
    )
  }
}
</script>

<style lang='sass' scoped>
.domPoint
  position: absolute
  border-radius: 50%
  background-clip: content-box
  cursor: pointer
</style>
