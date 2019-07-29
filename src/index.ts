import './index.css'
import { renderingBus } from './renderingBus'
import { initialKeyboard, initialCanvas, initialRenderGame } from './initialGame'

function renderLoop() {
  renderingBus.render()
  window.requestAnimationFrame(renderLoop)
}

window.onload = () => {
  initialCanvas()
  initialKeyboard()
  initialRenderGame()

  renderLoop()
}
