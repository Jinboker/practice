/**
 * 玩家坦克对象，继承自TankObj
 */
class PlayerObj extends TankObj {
	constructor(iLife, iRank) {
		super();

		this.iIndex = 0;
		this.iRank = iRank;              // 默认坦克等级为0，玩家坦克可以通过吃星星升级
		this.iLife = iLife;              // 玩家的生命数，默认是两条

		// 防护罩相关
		this.iShieldNum = 200;           // 防护罩循环的次数，默认是200，如果吃了防护罩奖励那么就是1000
		this.iShieldDelay = 3;
		this.iShieldPic = 0;

		// 子弹相关
		this.oBullet = new BulletObj(0); // 新建一个子弹对象
		aBullet.push(this.oBullet);      // 将子弹对象添加到数组中

		// 如果坦克等级大于等于2,那么一开始就需要多建立一个子弹对象
		if (this.iRank >= 2) {
			this.oBulletExtra = new BulletObj(0);
			aBullet.push(this.oBulletExtra);
		}
	}

	init(){
		this.bornInit();
		this.x = 128;
		this.y = 384;
		this.iDir = 0;
		this.iSpeed = 2;
		this.bShield = true;            // 是否开启防护罩
		this.keyDirSave = 0;            // 保存当前按下的方向键，用来判断是否有改变坦克的方向
		this.bMoveAble = true;          // 玩家是否可以运动和发射子弹

		this.moveSet();
	}

	draw(){
		// 判断坦克是否需要出生
		if (!this.bBorned) { this.born(); return; }

		// 防护罩（刚出生时候或者吃了防护罩的奖励）
		this.bShield && this.shield();

		// 如果奖励对象的实例存在，那么进行奖励对象的碰撞检测
		oBonus && this.bonusCollision();

		// 按键判断，再执行相应的操作
		this.bMoveAble && this.btn();

		// 绘制坦克
		cxt.role.drawImage(oImg.myTank, this.iRank * 32,  this.iDir * 64 + this.iWheelPic * 32, 32, 32, this.x, this.y, 32, 32);
	}

	// 按键判断
	btn(){
		// 看是否按下了上下左右，为真则重新设置坦克坐标
		if (keyInfo[keyDir_1].pressed) {
			this.iDir = keyInfo[keyDir_1].dir;
			// 看看是否有按下不同的方向键改变了坦克的方向，如果改变方向后重新设置move相关
			if (this.keyDirSave != keyDir_1) {
				this.keyDirSave = keyDir_1;
				this.moveSet();
			}
			this.move();     // 重新确定坦克的坐标
		}

		// 每次发射子弹后最少要经过15次循环才能再次发射子弹
		this.iBulletDelay > 0 && this.iBulletDelay --;
		// 发射子弹，J键，这里主要是为了防止J键一直按下的情况
		if (!this.iBulletDelay && keyInfo[74].pressed && oKeyUp.j) {
			oKeyUp.j = false;
			this.iBulletDelay = 15;
			if (!this.oBullet.bAlive) {
				// 这里的参数0表示这是玩家的坦克
				this.oBullet.init(this.x, this.y, this.iDir, 0, this.iRank);
				bPC && oAud.att.play();
			} else {
				if ((this.iRank >= 2) && !this.oBulletExtra.bAlive) {
					this.oBulletExtra.init(this.x, this.y, this.iDir, 0, this.iRank);
					bPC && oAud.att.play();
				}
			}
		}
	}

	// 防护罩
	shield(){
		// 防护罩默认持续200个循环，但是在坦克吃了防护罩奖励后会持续1000个循环
		if (this.iShieldNum > 0) {
			this.iShieldNum --;
			// 调用延迟函数，经过3次循环后才改变防护罩的图片
			this.iShieldDelay = delay(this.iShieldDelay, 3, () => {
				this.iShieldPic = +! this.iShieldPic;
			});
			cxt.role.drawImage(oImg.misc, 32 + this.iShieldPic * 32, 0, 32, 32, this.x, this.y, 32, 32);
		} else {
			this.bShield = false;
			this.iShieldNum = 200;
		}
	}

	// 玩家坦克与奖励的碰撞
	bonusCollision(){
		let xVal = Math.abs(this.x - oBonus.x),
			yVal = Math.abs(this.y - oBonus.y);

		if (xVal < 32 && yVal < 32) {
			cxt.misc.clearRect(35 + oBonus.x, 20 + oBonus.y, 32, 32);
			this.bonusType();
			oBonus = null;
			iEatBouns ++;
		}
	}

	// 确定奖励类型
	bonusType(){
		switch (oBonus.iType) {
			// 钢锹
			case 0:
				bPC && oAud.miscSound.play();
				oBonus.oHomeInit();
				break;
			// 星星
			case 1:
				bPC && oAud.life.play();
				// iRank的最大值是3
				if (this.iRank < 3) {
					this.iRank ++;
					// 如果玩家吃掉了两颗星星，那么玩家允许同时存在两颗子弹
					if (this.iRank === 2) {
						this.oBulletExtra = new BulletObj(0);
						aBullet.push(this.oBulletExtra);
					}
				}
				break;
			// 坦克
			case 2:
				bPC && oAud.life.play();
				if (this.iLife < 5) {
					this.iLife ++;
					myInfo();
				}
				break;
			// 钢盔
			case 3:
				bPC && oAud.miscSound.play();
				this.bShield = true;
				this.iShieldNum = 1000;
				break;
			// 炸弹
			case 4:
				bPC && oAud.bomb.play();
				// 已经出生的坦克全部炸掉
				for (let i = 1; i < 5; i++) {
					let obj = aTankArr[i];
					if (!obj.bBorned) { continue; }
					aBigExplode.push(new BigExplode(obj.x + 16, obj.y + 16, obj.iDir));
					obj.bAlive = false;              // 坦克死亡
					obj.bBorned = false;             // 坦克未出生
				}
				break;
			// 定时
			case 5:
				bPC && oAud.miscSound.play();
				oEnemy.bMoveAble = false;            // 所有的NPC坦克都被定住，不会移动也不会发射子弹
				iTimerDelay = 800;                   // 800个循环后NPC重新开始运动
				break;
			default:
				break;
		}
	}
}
