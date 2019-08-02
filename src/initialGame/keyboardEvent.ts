import { tuple } from 'src/utils'
import { KEY_CODE, Key, pressedKey, directionKey, funcKey } from '../global'

const handleKeyDown = key => {
  if (directionKey.includes(key)) {
    pressedKey.direction = key
  }

  if (funcKey.includes(key)) {
    pressedKey.func = key
  }
}

const handleKeyUp = (key: Key) => {
  tuple('direction', 'func').forEach(name => {
    if (pressedKey[name] === key) {
      pressedKey[name] = ''
    }
  })
}

export function initialKeyboard() {
  ['keydown', 'keyup'].forEach(item => {
    addEventListener(item, (ev: KeyboardEvent) => {
      const key = KEY_CODE[ev.keyCode] as Key

      if (!key) {
        return
      }

      if (ev.type === 'keydown') {
        handleKeyDown(key)
      } else {
        handleKeyUp(key)
      }
    })
  }, false)
}
