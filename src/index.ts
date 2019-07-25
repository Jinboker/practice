import './index.css'
import { renderer } from './render'
import { initialKeyboard, initialCanvas } from './initialGame'

function renderLoop() {
  renderer.render()
  window.requestAnimationFrame(renderLoop)
}

window.onload = () => {
  initialCanvas()
  initialKeyboard()
  renderLoop()
}
