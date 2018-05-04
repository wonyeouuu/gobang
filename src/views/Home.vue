<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Gobang from '@/core/Gobang'
import {
  CanvasBoard,
  CanvasPoint,
  browserSupport as browserSupportCanvas,
} from '@/components/Gobang/Canvas'
import {
  DomBoard,
  DomPoint,
  browserSupport as browserSupportDom,
} from '@/components/Gobang/Dom'

@Component
export default class Home extends Vue {
  data () {
    return {
      game: new Gobang(),
    }
  }

  render () {
    /**
     * (coordinate -> void) -> coordinate -> void
     */
    const makeMoveHandler = fn => ({ row, col }) => {
      !this.$data.game.isFinished && fn({ row, col })
    }

    return (
      <div class='home'>
        {this.renderStatusBar()}

        {browserSupportCanvas() && (
          <CanvasBoard
            state={this.$data.game.state}
            onMove={makeMoveHandler(
              ({ row, col }) => {
                this.$data.game.add(row, col)
                this.$forceUpdate()
              }
            )}
            scopedSlots={{
              default: (props) => <CanvasPoint {...{ props }}/>,
            }}
          />
        )}

        {browserSupportDom() && (
          <DomBoard
            state={this.$data.game.state}
            onMove={makeMoveHandler(
              ({ row, col }) => {
                this.$data.game.add(row, col)
              }
            )}
            scopedSlots={{
              default: (props) => (
                <DomPoint
                  {...{ props }}
                  nativeOnClick={props.handleClick}
                />
              ),
            }}
          />
        )}
      </div>
    )
  }

  renderStatusBar () {
    const game = this.$data.game

    const statusText = (() => {
      if (game.isFinished) {
        return game.isBlack
          ? 'White Wins'
          : 'Black Wins'
      } else {
        return game.isBlack
          ? 'Black'
          : 'White'
      }
    })()

    return (
      <div class='status'>
        <input
          class='status__reset'
          type='button'
          value='Reset'
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
          value='Undo'
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
