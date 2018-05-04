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
      <div class='home'>
        {this.renderStatusBar()}
        <CanvasBoard
          state={this.$data.game.state}
          onMove={({ row, col }) => {
            if (!this.$data.game.isFinished) {
              this.$data.game.add(row, col)
              this.$forceUpdate()
            }
          }}
          scopedSlots={{
            default: (props) => {
              return <CanvasPoint {...{ props }}/>
            },
          }}
        />
      </div>
    )
  }

  renderStatusBar () {
    const game = this.$data.game

    const statusText = (() => {
      if (game.isFinished) {
        return game.isBlack
          ? '白方勝'
          : '黑方勝'
      } else {
        return game.isBlack
          ? '換黑方'
          : '換白方'
      }
    })()

    return (
      <div class='status'>
        <input
          class='status__reset'
          type='button'
          value='重來'
          onClick={() => {
            this.$data.game = new Gobang()
          }}
        />
        <span
          class={{
            status__text: true,
            'status__text--black': game.isBlack,
            'status__text--finish': game.isFinished,
          }}
        >
          {statusText}
        </span>
        <input
          class='status__revert'
          type='button'
          value='悔棋'
          disabled={game.isFinished}
          onClick={() => {
            game.revert()
            this.$forceUpdate()
          }}
        />
      </div>
    )
  }
}
</script>

<style lang='sass' scoped>
.home
  text-align: center

.status
  display: flex
  justify-content: space-between
  align-items: stretch
  height: 30px
  margin-bottom: 10px

  input
    flex: 1
    height: 100%
    font-size: 100%

  &__reset
    border: 2px solid red

  &__revert
    border: 2px solid blue

  &__text
    padding: 3px 10px

    &--black
      background-color: black
      color: white

    &--finish
      background-color: blue
      color: yellow
</style>
