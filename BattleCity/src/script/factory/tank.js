import { Mover } from './mover';

class Tank extends Mover {
  constructor (x, y, direction) {
    super(x, y, direction);
  }
}

export { Tank };