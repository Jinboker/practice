import { core } from 'src/core'
import { Player } from '..'
import { clearCanvas } from 'src/utils'
import { ScreenRenderer } from './ScreenRenderer'

export class Playing extends ScreenRenderer {
  protected operate = {
    A() {
      core.isStop = !core.isStop
    }
  }

  constructor() {
    super('playing')

    new Player()
    // new NpcQueue()
  }

  render() {
    clearCanvas(['role', 'other'])
  }
}
