// export const keyBoard = {
//   isPressed: false,
//   fnKey: '',
//   directKey: '',
//   pressedKey: '',
//   W: false,
//   A: false,
//   S: false,
//   D: false,
//   H: false,
//   J: false
// };
type IKeyStatus = {
  up: boolean;
  down: boolean;
  right: boolean;
  left: boolean;
  pressedKey: undefined | IKey
}

export const keyStatus: IKeyStatus = {
  up: false,
  down: false,
  left: false,
  right: false,
  pressedKey: undefined
}