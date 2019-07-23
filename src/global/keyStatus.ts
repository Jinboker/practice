type IKey = 'up' | 'down' | 'left' | 'right' | 'A' | 'B'

type IKeyStatus = {
  up: boolean;
  down: boolean;
  right: boolean;
  left: boolean;
  A: boolean;
  B: boolean;
  pressedKey: undefined | IKey
}

export const keyStatus: IKeyStatus = {
  up: false,
  down: false,
  left: false,
  right: false,
  A: false,
  B: false,
  // todo 这个对象上直接写getter和setter
  pressedKey: undefined
}

class KeyStatus {
  private _up: boolean = false
  private _down: boolean = false
  private _left: boolean = false
  private _right: boolean = false
  private _A: boolean = false
  private _B: boolean = false

  public pressedKey: undefined | IKey

  private setPressedKey(key: IKey, val: boolean) {
    if (val) {
      this.pressedKey = key
    } else {
      if (this.pressedKey === key) {
        this.pressedKey = void 0
      }
    }
  }

  get up() {
    return this._up
  }

  set up(val: boolean) {
    this._up = val
    this.setPressedKey('up', val)
  }

  get down() {
    return this._down
  }

  set down(val: boolean) {
    this._down = val
    this.setPressedKey('down', val)
  }

  get left() {
    return this._left
  }

  set left(val: boolean) {
    this._left = val
    this.setPressedKey('left', val)
  }

  get right() {
    return this._right
  }

  set right(val: boolean) {
    this._right = val
    this.setPressedKey('right', val)
  }

  get A() {
    return this._A
  }

  set A(val: boolean) {
    this._A = val
    this.setPressedKey('A', val)
  }

  get B() {
    return this._B
  }

  set B(val: boolean) {
    this._B = val
    this.setPressedKey('B', val)
  }
}

const a = new KeyStatus()
console.log(a)
