export interface ModuleRenderer {
  render: () => void
}

class Renderer {
  private list: ModuleRenderer[]

  public register(moduleRenderer: typeof ModuleRenderer) {
    this.list.push(new moduleRenderer())
  }
}

const renderer = new Renderer()

export { renderer }
