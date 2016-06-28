let tankLife = 2;
class MyTank extends TankObj{
	init(){
		this.x = 128;
		this.y =  384;
		this.iType = 1;        //坦克的状态，最高三级，可以打钢筋
		this.dir = 0;          //己方坦克默认方向向下
		this.iTankSpeed = 2;   //己方坦克默认速度为2

		// 防护罩
		this.shieldLoopNumSet = true;         //是否设置防护罩的执行次数
		this.shieldNum = 0;                   //防护罩的执行次数
		this.shieldNumSave = 0;               //防护罩执行次数的保存
		this.shieldAble = true;               //是否具有防护罩，默认有，在防护罩时间结束后被关闭
		this.shieldPicPos = 0;                //决定防护罩显示的是哪部分的图片
		this.iShieldDelay = 3;                //这个是用来控制防护罩变化的延迟

		this.shot = false;                //己方坦克默认不射击
		this.bShotAble = false;
		this.iBulletDelay = 0;          //最少需要n次循环后才会开始发射下一发子弹，默认是0，第一次发射子弹过后设置成20

		this.keyDirSave = 0;            //保存当前按下的方向键，用来判断是否有改变坦克的方向

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
			this.tankPosi();     //重新确定坦克的坐标
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

	// 防护罩相关
	shield(){
		if (this.shieldLoopNumSet) {
			this.shieldNum = oBonus.shield ? 1000 : 200;   //如果有防护罩，则循环1000次，没有则循环200次
			this.shieldLoopNumSet = false;
		}
		if (this.shieldNumSave < this.shieldNum) {
			this.shieldNumSave ++;
			// 每隔3次循环改变一下防护罩的图片
			this.iShieldDelay > 0 && this.iShieldDelay --;
			if (!this.iShieldDelay) {
				this.iShieldDelay = 3;
				this.shieldPicPos = +! this.shieldPicPos;
			}
			cxt.role.drawImage(oImg.misc , 32 + this.shieldPicPos * 32 , 0 , 32 , 32 , this.x , this.y , 32 , 32);
		} else {
			this.shieldNumSave = 0;
			this.shieldAble = false;
		}
	}

	draw() {
		// 判断坦克是否需要出生
		if (!this.borned) {
			this.born();
			return;
		}

		// 按键判断，再执行相应的操作
		keyPressed && this.btn();

		//绘制子弹，只有当按键J按下的时候this.shot才会为真
		if (this.shot) {
			this.bulletStatus && oAud.att.play();
			this.bullet();
		}

		// 防护罩（刚出生时候或者吃了防护罩的奖励）
		this.shieldAble && this.shield();

		// 绘制坦克
		cxt.role.drawImage(oImg.myTank , 0 ,  0 + this.dir * 64 + this.wheel * 32 , 32 , 32 , this.x , this.y , 32 , 32);
	}
}
