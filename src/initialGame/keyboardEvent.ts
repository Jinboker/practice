import { keyStatus, keyCode } from '../global'

const handleKeyDown = (key: IKey) => {
  keyStatus[key] = false
}

const handleKeyUp = (key: IKey) => {
  if (keyStatus[key]) return

  keyStatus.pressedKey = key
  keyStatus[key] = true
}

export function initialKeyboard() {
  ['keydown', 'keyup'].forEach(item => {
    addEventListener(item, (ev: KeyboardEvent) => {
      const key = keyCode[ev.keyCode] as IKey

      if (!key || !(key in keyStatus)) return

      if (ev.type === 'keydown') {
        handleKeyDown(key)
      } else {
        handleKeyUp(key)
      }
    })
  }, false)
}
