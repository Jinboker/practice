export interface IModuleRenderer {
  render: () => void
}
type IRenderer = {
  selectGameMode: IModuleRenderer | null;
}

class Renderer {
  private rendererGroup: IRenderer

  mountRenderer<T extends IModuleRenderer>(rendererName: string, moduleRenderer: T) {
    this.rendererGroup[rendererName] = moduleRenderer
  }

  removeRenderer(rendererName: string) {
    this.rendererGroup[rendererName] = name
  }

}

export const renderer = new Renderer()
