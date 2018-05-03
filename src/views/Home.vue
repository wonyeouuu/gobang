<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import CanvasBoard from '@/components/Gobang/CanvasBoard'
import CanvasPoint from '@/components/Gobang/CanvasPoint'
import Gobang from '@/core/gobang'

@Component
export default class Home extends Vue {
  data () {
    const game = new Gobang()

    return {
      game,
    }
  }

  render () {
    return (
      <CanvasBoard
        state={this.$data.game.state}
        onMove={({ row, col }) => {
          this.$data.game.add(row, col)
          this.$forceUpdate()
        }}
        scopedSlots={{
          default: (props) => {
            return <CanvasPoint {...{ props }}/>
          },
        }}
      />
    )
  }
}
</script>
