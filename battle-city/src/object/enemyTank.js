/**
 * 敌方坦克对象，继承自TankObj
 */
class EnemyObj extends TankObj {
	constructor(i) {
		super();

		this.iIndex = i;
		this.iType;                      // 敌军坦克的类型
		this.iChangeDirDelay = 10;       // 坦克碰到障碍物后暂停10个循环后再改变方向
		this.bUiSet = true;              // UI界面右侧剩余坦克数的设置
		this.OrderNum;                   // 本次绘制的是第几个坦克

		// 子弹相关
		this.oBullet = new BulletObj(i); // 新建一个子弹对象
		aBullet.push(this.oBullet);      // 将子弹对象添加到数组中
	}

	init(){
		this.bornInit();
		this.iDir = 2;
		this.x = (oEnemy.num % 3) * 192;
		this.y = 0;
		this.iType = oEnemyData[stage.num - 1][oEnemy.num - 1];
		this.iSpeed = (parseInt(this.iType/2) === 2) ? 2 : 1;
		this.OrderNum = oEnemy.num;
		oEnemy.num ++;
		oEnemy.iBornDelay += 150;

		this.moveSet();
	}

	draw(){
		// 判断坦克是否需要出生
		if (!this.bBorned) {
			// 剩余坦克数量的图标的减少
			cxt.bg.clearRect(481 - ((21 - this.OrderNum) % 2) * 18, 20 + parseInt((22 - this.OrderNum) / 2) * 18, 16, 16);
			this.born();
			return;
		}

		// 玩家在吃了定时后oEnemy.bMoveAble为假，NPC无法移动和发射子弹
		if (oEnemy.bMoveAble) {
			// 每次遇到障碍物后经过10个循环后改变方向
			(!this.bHitBarrier || !this.bHitTank) ? this.changeDir() : this.iChangeDirDelay = 10;

			// 是否准备发射子弹
			this.shot();

			// 移动坦克
			this.move();
		}

		// 绘制坦克
		cxt.role.drawImage(oImg.enemyTank, 32 * this.iType,  this.iDir * 64 + this.iWheelPic * 32, 32, 32, this.x, this.y, 32, 32);
	}

	changeDir(){
		this.iChangeDirDelay = delay(this.iChangeDirDelay, 10, () => {
			this.iDir = parseInt(Math.random()*4);
			this.moveSet();
		});
	}

	shot(){
		if (!this.oBullet.bAlive) {
			this.iBulletDelay > 0 && this.iBulletDelay --;
			if (!this.iBulletDelay) {
				// 重置发射子弹的时间间隔，分别有20、40、60三档
				this.setBulletDelay();
				// 这里的参数1表示这是NPC的坦克
				!this.oBullet.bAlive && this.oBullet.init(this.x, this.y, this.iDir, 1);
			}
		}
	}

	setBulletDelay(){
		let aDelay = [20, 40, 60];
		// 如果坦克的类型是2或者3，那么发射子弹的最小间隔是15（同玩家一样）
		this.iBulletDelay = (parseInt(this.iType/2) === 1) ? 15 : aDelay[parseInt(Math.random()*3)];
	}
}
