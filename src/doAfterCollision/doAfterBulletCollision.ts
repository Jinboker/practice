import res from '../data/assets';
import eventBus from '../util/eventBus';
import { roadMap } from '../map/affirmRoadMap';
import { getPositionInBrick } from '../util/fn';
import { CXT_BG, OFFSET_X, OFFSET_Y, spiritCollection, brickStatus } from '../global';

const EXPLODE_AUD = res.audio.explode;
const ATTACK_OVER_AUD = res.audio.attackOver;

export default class DoAfterCollision {
  private static playAttackOverAud(identity: string) {
    (identity === 'playerBullet') && ATTACK_OVER_AUD.play();
  }

  public static hitBorder(coord: number[], identity: string) {
    DoAfterCollision.playAttackOverAud(identity);
    DoAfterCollision.produceExplode(coord, 'small');
  }

  public static hitHome() {
  }

  public static hitBullet(bulletId: number) {
  }

  public static hitTank(tankId: number, tankCoord: number[]) {
    let dieTankIndex = spiritCollection.tankArr.findIndex(ele => (ele.id === tankId));

    if (!~dieTankIndex) return;

    EXPLODE_AUD.play();
    DoAfterCollision.produceExplode(tankCoord, 'big');
    // 事件响应在drawTank.ts
    eventBus.dispatch('tank-die', dieTankIndex);
  }

  private static clearSmallBarrier(directionNum: number, nextX: number, nextY: number, row: number, col: number) {
    const indexInBrick = getPositionInBrick({ x: nextX, y: nextY, row, col, directionNum });
    const brickStatusArr = brickStatus[row * 28 + col];

    let x, y, rangeX, rangeY;

    if (directionNum % 2) {
      [x, y, rangeX, rangeY] = [col * 16 + 8 * indexInBrick, row * 16, 8, 16];
      [0, 1].forEach(ele => (brickStatusArr[ele][indexInBrick] = 0));
    } else {
      [x, y, rangeX, rangeY] = [col * 16, row * 16 + 8 * indexInBrick, 16, 8];
      brickStatusArr[indexInBrick] = [0, 0];
    }

    CXT_BG.clearRect(OFFSET_X + x, OFFSET_Y + y, rangeX, rangeY);
  }

  private static clearBigBarrier(row: number, col: number) {
    roadMap[row][col] = 0;
    CXT_BG.clearRect(OFFSET_X + col * 16, OFFSET_Y + row * 16, 16, 16);
  }

  public static hitSteel(params: ClearSteelParams) {
    const { rank, row, col, identity } = params;

    rank === 3
      ? DoAfterCollision.clearBigBarrier(row, col)
      : DoAfterCollision.playAttackOverAud(identity);
  }

  public static hitBrick(params: ClearBrickParams) {
    const { rank, nextX, nextY, directionNum, row, col } = params;

    if (rank <= 1) {
      // 子弹等级<= 1时击中砖块后清除砖块
      const index = row * 28 + col;

      !brickStatus[index] && (brickStatus[index] = [[1, 1], [1, 1]]);
      DoAfterCollision.clearSmallBarrier(directionNum, nextX, nextY, row, col);
    } else {
      DoAfterCollision.clearBigBarrier(row, col);
    }
  }

  public static produceExplode(coord: number[], type: string) {
    // 事件响应在drawExplode.ts
    eventBus.dispatch('new-explode', coord, type);
  }
}
