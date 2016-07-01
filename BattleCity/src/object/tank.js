/**
 * 坦克对象，继承自MoverObj
 */
class TankObj extends MoverObj {
	constructor() {
		super();

		//渲染出生时候的动画
		this.bBorned = false;              //坦克角色是否已经出生
		this.iBornAniNum = 0;              //出生的动画循环的次数
		this.iBornPic = 0;                 //当前出生的动画所显示的图片
		this.iBornDelay = 3;               //三个循环的延迟改变一次出生的图片

		// 轮胎改变相关
		this.iWheelPic = 0;
		this.iWheelDelay = 5;
	}

	delay(num , delayNum , fn){
		num > 0 && num --;
		if (!num) {
			num = delayNum;
			fn();
		}
		return num;
	}

	wheel(){
		this.iWheelDelay = this.delay(this.iWheelDelay , 5 , () => {
			this.iWheelPic = +!this.iWheelPic;
		});
	}

	born(){
		// 动画播放4次
		if (this.iBornAniNum < 4) {
			this.bornDelay = this.delay(this.bornDelay , 3 , () => {
				// 一个完整的动画由四张图组成
				if (this.iBornPic < 4) {
					this.iBornPic ++;
					cxt.misc.drawImage(oImg.bonus , 96 - 32 * this.iBornPic , 64 , 32 , 32 , 128 , 384 , 32 , 32);
				} else {
					this.iBornPic = 0;
					this.iBornAniNum ++;
					cxt.misc.clearRect(128 , 384 , 32 , 32);
				}
			});
		} else {
			cxt.misc.clearRect(163 , 384 , 32 , 32);
			this.iBornAniNum = 0;
			this.bBorned = true;              //出生的动画执行完毕，开始绘制坦克
		}
	}
}





/**
 * 玩家坦克对象，继承自TankObj
 */
class PlayerObj extends TankObj {
	constructor() {
		super();

		// 防护罩相关
		this.bShield = true;            //是否开启防护罩
		this.iShieldNum = 200;          //防护罩循环的次数，默认是200，如果吃了防护罩奖励那么就是1000
		this.iShieldDelay = 3;
		this.iShieldPic = 0;

		// 按键相关
		this.keyDirSave = 0;            //保存当前按下的方向键，用来判断是否有改变坦克的方向

		this.init();
	}

	init(){
		this.iDir = 0;
		this.x = 128;
		this.y =  384;
	}

	// 防护罩
	shield(){
		if (this.iShieldNum > 0) {
			this.iShieldNum --;
			this.iShieldDelay = this.delay(this.iShieldDelay , 3 , () => {
				this.iShieldPic = +! this.iShieldPic;
			});
			cxt.role.drawImage(oImg.misc , 32 + this.iShieldPic * 32 , 0 , 32 , 32 , this.x , this.y , 32 , 32);
		} else {
			this.bShield = false;
			this.iShieldNum = 200;
		}
	}

	//按键判断
	btn(){
		// 看是否按下了上下左右，为真则重新设置坦克坐标
		if (keyDir_1 && keyInfo[keyDir_1].pressed) {
			this.dir = keyInfo[keyDir_1].dir;
			// 看看是否有按下不同的方向键改变了坦克的方向
			if (this.keyDirSave != keyDir_1) {
				this.keyDirSave = keyDir_1;
				this.dirChange = true;
			}
			this.move();     //重新确定坦克的坐标
			this.wheel();    //轮胎改变
		}

		// 开始/暂停，H键
		if (!keyInfo[72].pressed) {
			startAble = true;
		}
		if (startAble && keyInfo[72].pressed) {
			draw.tank = false;
			draw.stop = true;
			stopSet = true;
			startAble = false;
		}

		//发射子弹，J键
		if (!keyInfo[74].pressed) {
			this.bShotAble = true;
		}
		this.iBulletDelay > 0 && this.iBulletDelay --;
		if (!this.iBulletDelay && this.bShotAble && keyInfo[74].pressed) {
			this.iBulletDelay = 20;
			this.bShotAble = false;
			this.shot = true;
		}
	}
}





/**
 * 敌方坦克对象，继承自TankObj
 */
class EnemyObj extends TankObj {
	constructor() {
		super();
		this.init();
	}

	init(){
		this.iDir = 2;
		this.x = null;
		this.y = 0;
	}
}
