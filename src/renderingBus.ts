/**
 * 渲染总线，所有的渲染器都会被注册到渲染总线上进行统一渲染
 */
import { tankCollision } from 'src/collision'

type Fn = () => void
type RendererList = Array<{
  id: string;
  renderer: Fn
}>

const getIndex = (id: string, list: RendererList) => list.findIndex(item => item.id === id)

class RenderingBus {
  private rendererList: RendererList = []

  registerRenderer(id: string, renderer: Fn) {
    this.rendererList.push({
      id, renderer
    })
  }

  removeRenderer(id: string) {
    const { rendererList } = this
    const index = getIndex(id, rendererList)

    if (~index) {
      rendererList.splice(index, 1)
    }
  }

  render() {
    this.rendererList.forEach(item => {
      item.renderer()
    })

    tankCollision.checkCollision()
  }
}

export const renderingBus = new RenderingBus()
