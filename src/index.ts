import './style/index.css'
import { render } from './render'
import { initialKeyboard, initialCanvas } from './initialGame'

function renderLoop() {
  render()
  window.requestAnimationFrame(renderLoop)
}

window.onload = () => {
  initialCanvas()
  initialKeyboard()
  renderLoop()
}
