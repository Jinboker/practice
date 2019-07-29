// import { stageMap } from 'src/config'
// import { ctx, imgs, screen } from 'src/global'
// import { roadMapItemMapper } from './roadMapItemMapper'
//
// const { brick } = imgs
// const { yOffset, xOffset } = screen.gameView
//
// class GameMap {
//   /**
//    * 配置好的map只能表明一个 16 * 16的格子
//    * 不过在游戏中，比如一个砖块，当玩家的子弹是最低级的时候，一次最多只能清空一个 8 * 16 区域，且比如草丛，除了视图上以外没有任何区别
//    * 因此，地图数据无法直接用于判断坦克或者子弹能否通过，需要进行二次解析生成对应的roadMap
//    *
//    * ??? 为什么是 28 * 28 的格子来着？忘了
//    */
//   private roadMap = new Array(28).fill(0).map(() => new Array(28).fill(0))
//
//   /**
//    * 渲染地图，地图只用渲染一次即可，后面有变化直接擦掉对应的内容
//    * @param stageNum
//    */
//   render(stageNum: number) {
//     const bgCtx = ctx.bg!
//     const mapConfig = stageMap[stageNum]
//
//     new Array(13).fill(null).forEach((_, row) => {
//       new Array(13).fill(null).forEach((__, col) => {
//         const mapItemType = mapConfig[row][col]
//
//         /**
//          * 渲染地图，顺便将地图数据进行解析，获取对应格子的坦克和子弹的路径地图
//          */
//         if (mapItemType) {
//           bgCtx.drawImage(brick, 32 * mapItemType, 0, 32, 32, xOffset + 32 * col, yOffset + 32 * row, 32, 32)
//         }
//       })
//     })
//   }
// }
//
// export const mapRenderer = new GameMap()
