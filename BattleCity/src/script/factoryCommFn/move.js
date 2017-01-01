let moveIncrement = {
  U(speed) {
    return [0, -speed];
  },
  R(speed) {
    return [speed, 0];
  },
  D(speed) {
    return [0, speed];
  },
  L(speed) {
    return [-speed, 0];
  }
};

function positionAfterMove (x, y, direction, speed) {
  let offsetArr = moveIncrement[direction](speed);

  return [x + offsetArr[0], y + offsetArr[1]];
}

export { positionAfterMove };