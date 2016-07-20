/**
 * 玩家坦克对象，继承自TankObj
 */
class PlayerObj extends TankObj {
	constructor() {
		super();

		this.iIndex = 0;
		this.iRank = 0;                 //默认坦克等级为0，玩家坦克可以通过吃星星升级
		this.iTankType = 0;             //当前坦克对象是玩家（0）还是NPC（1）

		// 防护罩相关
		this.bShield = true;            //是否开启防护罩
		this.iShieldNum = 200;          //防护罩循环的次数，默认是200，如果吃了防护罩奖励那么就是1000
		this.iShieldDelay = 3;
		this.iShieldPic = 0;

		// 按键相关
		this.keyDirSave = 0;            //保存当前按下的方向键，用来判断是否有改变坦克的方向

		// 初始化坦克设置
		this.init();
	}

	init(){
		this.bBorned = false;
		this.x = 128;
		this.y = 384;
		this.iDir = 0;
		this.iSpeed = 2;
	}

	draw(){
		// 判断坦克是否需要出生
		if (!this.bBorned) { this.born(); return; }

		// 防护罩（刚出生时候或者吃了防护罩的奖励）
		this.bShield && this.shield();

		// 按键判断，再执行相应的操作
		this.btn();

		//如果子弹存活，那么绘制子弹
		this.oBullet.bAlive && this.shot();

		// 绘制坦克
		cxt.role.drawImage(oImg.myTank , 0 ,  this.iDir * 64 + this.iWheelPic * 32 , 32 , 32 , this.x , this.y , 32 , 32);
	}

	//按键判断
	btn(){
		// 看是否按下了上下左右，为真则重新设置坦克坐标
		if (keyInfo[keyDir_1].pressed) {
			this.iDir = keyInfo[keyDir_1].dir;
			// 看看是否有按下不同的方向键改变了坦克的方向，如果改变方向后重新设置move相关
			if (this.keyDirSave != keyDir_1) {
				this.keyDirSave = keyDir_1;
				this.bMoveSet = true;
			}
			this.move();     //重新确定坦克的坐标
		}


		// 开始/暂停，H键
		if (keyInfo[72].pressed && oKeyUp.h) {
			oKeyUp.h = false;
			draw.tank = false;
			draw.stop = true;
			stopSet = true;
		}

		// 每次子弹消失后要经过20此循环后才能再次发射子弹
		this.iBulletDelay > 0 && this.iBulletDelay --;
		//发射子弹，J键，这里主要是为了防止J键一直按下的情况
		if (!this.iBulletDelay && keyInfo[74].pressed && oKeyUp.j) {
			this.iBulletDelay = 20;
			oKeyUp.j = false;
			if (!this.oBullet.bAlive) {
				//这里的参数0表示这是玩家的坦克
				this.oBullet.init(this.x , this.y , this.iDir , 0 , this.iIndex , this.iRank);
				oAud.att.play();
			}
		}
	}

	// 防护罩
	shield(){
		// 防护罩默认持续200个循环，但是在坦克吃了防护罩奖励后会持续1000个循环
		if (this.iShieldNum > 0) {
			this.iShieldNum --;
			// 调用延迟函数，经过3次循环后才改变防护罩的图片
			this.iShieldDelay = delay(this.iShieldDelay , 3 , () => {
				this.iShieldPic = +! this.iShieldPic;
			});
			cxt.role.drawImage(oImg.misc , 32 + this.iShieldPic * 32 , 0 , 32 , 32 , this.x , this.y , 32 , 32);
		} else {
			this.bShield = false;
			this.iShieldNum = 200;
		}
	}
}
