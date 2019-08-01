import { Player } from '..'
import { clearCanvas } from 'src/utils'
import { ScreenRenderer } from './ScreenRenderer'

export class Playing extends ScreenRenderer {
  constructor() {
    super('playing')

    new Player()
  }

  render() {
    clearCanvas(['role', 'other'])
  }
}
