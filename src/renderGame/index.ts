export interface ModuleRenderer {
  render: () => void
}

class Renderer {
  private list: ModuleRenderer[]

  public register(moduleRenderer: ModuleRenderer) {
    this.list.push(moduleRenderer)
  }
}

const renderer = new Renderer()

export { renderer }
