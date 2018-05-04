import CanvasBoard from './CanvasBoard'
import CanvasPoint from './CanvasPoint'

const browserSupport = () => {
  const elem = document.createElement('canvas')
  return !!(elem.getContext && elem.getContext('2d'))
}

export {
  CanvasBoard,
  CanvasPoint,
  browserSupport,
}
