import './style/index.css'
import { initialKeyboard, initialDom } from './initialGame'

window.onload = () => {
  initialDom()
  initialKeyboard()
}
