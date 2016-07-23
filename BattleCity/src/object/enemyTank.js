let oEnemy = {
	maxTankAlive : 4,    //敌军坦克同一时间最多只能有四个
	maxNum : 20,         //敌军坦克的总数是20个
	num : 1              //当前画出来的是第几个坦克，因为坦克是从正中间开始刷新，因此从1开始计数
};

let oEnemyData = [
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2],
	[1, 2, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2],
];

let npcBornDelay = 30;         //第一个NPC延迟60个循环后出生，以后的坦克延迟180个循环出生
/**
 * 敌方坦克对象，继承自TankObj
 */
class EnemyObj extends TankObj {
	constructor(i) {
		super();

		this.iIndex = i;
		this.iTankType = 0;              //当前坦克对象是玩家（0）还是NPC（1）
		this.iEnemyTankType;             //敌军坦克的类型
		this.iChangeDirDelay = 10;       //坦克碰到障碍物后暂停10个循环后再改变方向
		this.bUiSet = true;              //UI界面右侧剩余坦克数的设置
		this.OrderNum;                   //本次绘制的是第几个坦克
	}

	init(){
		this.bAlive = true;
		this.bBorned = false;
		this.iDir = 2;
		this.x = (oEnemy.num % 3) * 192;
		this.y = 0;
		console.log(stage.num);
		this.iEnemyTankType = oEnemyData[stage.num - 1][oEnemy.num - 1];
		this.iSpeed = (this.iEnemyTankType != 2 && this.iEnemyTankType != 3) ? 1 : 2;
		this.OrderNum = oEnemy.num;
		oEnemy.num ++;
		npcBornDelay += 180;
	}

	draw(){
		// 判断坦克是否需要出生
		if (!this.bBorned) {
			// 剩余坦克数量的图标的减少
			cxt.bg.clearRect(481 - ((21 - this.OrderNum) % 2) * 18 , 20 + parseInt((22 - this.OrderNum) / 2) * 18, 16 , 16);
			this.born();
			return;
		}

		// 每次遇到障碍物后经过10个循环后改变方向
		(!this.bHitBarrier || !this.bHitTank) ? this.changeDir() : this.iChangeDirDelay = 10;

		//绘制子弹
		this.shot();

		// 移动坦克
		this.move();

		// 绘制坦克
		cxt.role.drawImage(oImg.enemyTank , 32 * this.iEnemyTankType ,  this.iDir * 64 + this.iWheelPic * 32 , 32 , 32 , this.x , this.y , 32 , 32);
	}

	changeDir(){
		this.iChangeDirDelay = delay(this.iChangeDirDelay , 10 , () => {
			this.iDir = parseInt(Math.random()*4);
			this.bMoveSet = true;
		});
	}

	/**
	 * 覆盖-------绘制子弹
	 */
	shot(){
		if (this.oBullet.bAlive) {
			this.oBullet.draw();
		} else {
			this.iBulletDelay > 0 && this.iBulletDelay --;
			if (!this.iBulletDelay) {
				// 默认的延迟是20个循环，这里进行重置
				this.setBulletDelay();
				//这里的参数1表示这是NPC的坦克
				!this.oBullet.bAlive && this.oBullet.init(this.x , this.y , this.iDir , 1 , this.iIndex);
			}
		}
	}

	setBulletDelay(){
		let aDelay = [20 , 40 , 60];
		this.iBulletDelay = aDelay[parseInt(Math.random()*3)];
	}

}
