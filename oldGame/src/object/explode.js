/**
 * 循环绘制爆炸
 * @param  {[array]} aBoomArr [储存大小爆炸的数组]
 */
function boomLoop(aBoomArr) {
    let len = aBoomArr.length;
    if (len) {
        for (let i = 0; i < len; i++) {
            aBoomArr[i].draw();
        }
        if (!aBoomArr[0].bAlive) {
            let oFirstBoom = aBoomArr[0];
            let iLength = oFirstBoom.iType ? 64 : 32;
            cxt.misc.clearRect(oFirstBoom.draw_x, oFirstBoom.draw_y, iLength, iLength);
            aBoomArr.shift();
        }
    }
}

/**
 * 循环执行boomLoop函数，绘制小爆炸跟大爆炸
 */
function explode() {
    // i为0时是大爆炸，为1时是小爆炸
    for (let i = 0; i < 2; i++) {
        boomLoop(aBoom[i]);
    }
}

// 爆炸效果类
class Explode {
    constructor(x, y, dir) {
        this.x = x + 35;
        this.y = y + 20;
        this.draw_x;
        this.draw_y;
        this.iDir = dir;
        this.iDelay;
        this.iPic = 0; // 用来确定爆炸所绘制的图片的裁剪位置
        this.bAlive = true; // 这个爆炸效果是否还应该存在(一开始默认存在)
        this.init();
    }

    init() {
        if (this.iDir % 2) {
            [this.draw_x, this.draw_y] = (this.iDir - 1) ? [this.x + 8, this.y + 4] : [this.x, this.y + 4];
        } else {
            [this.draw_x, this.draw_y] = this.iDir ? [this.x + 4, this.y + 8] : [this.x + 4, this.y];
        }
    }

    delay(num) {
        this.iDelay = delay(this.iDelay, num, () => {
            this.iPic++;
            (this.iPic === num) && (this.bAlive = false);
        });
    }
}

// 小的爆炸效果，继承自爆炸效果类
class SmallExplode extends Explode {
    constructor(x, y, dir) {
        super(x, y, dir);
        this.iDelay = 2;
        this.iType = 0; // 表示小爆炸
        [this.draw_x, this.draw_y] = [this.draw_x - 16, this.draw_y - 16];
    }

    draw() {
        cxt.misc.drawImage(oImg.boom, 16 + 64 * this.iPic, 16, 32, 32, this.draw_x, this.draw_y, 32, 32);
        this.delay(2);
    }
}

// 大的爆炸效果，继承自爆炸效果类
class BigExplode extends Explode {
    constructor(x, y, dir) {
        super(x, y, dir);
        this.iDelay = 2;
        this.iType = 1; // 表示大爆炸
        [this.draw_x, this.draw_y] = [this.draw_x - 32, this.draw_y - 32];
    }

    draw() {
        cxt.misc.drawImage(oImg.boom, 128 + 64 * this.iPic, 0, 64, 64, this.draw_x, this.draw_y, 64, 64);
        this.delay(3);
    }
}
