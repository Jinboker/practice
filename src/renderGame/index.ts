export default class RenderGame {
  // renderContent主要是在ctrlCenter文件中进行控制
  public static renderContent: Render;

  public static render() {
    RenderGame.renderContent.draw();
  }
}
