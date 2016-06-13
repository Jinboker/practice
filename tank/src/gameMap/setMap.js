// 设置地图
class SetMap{
	constructor(){
		this.x;
		this.y;
	}

	init(){
		this.x = 0;
		this.y = 0;

		this.delay = new Delay();

		this.setBg = true;     //是否需要设置界面背景
		this.drawTankAble = true;     //是否需要重绘坦克

		this.dir = null;     //方向

		this.brickNum = 0;    //砖块改变的计数
		this.brickNumSave = false;

		this.move = new Array(87);
		// 上
		this.move[87] = () => {
			this.y > 0 ? this.y -= 32 : this.y;
		}
		// 下
		this.move[83] = () => {
			this.y < 384 ? this.y += 32 : this.y;
		};
		// 左
		this.move[65] = () => {
			this.x > 0 ? this.x -= 32 : this.x;
		};
		// 右
		this.move[68] = () => {
			this.x < 384 ? this.x += 32 : this.x;
		};
	}

	draw(){
		// 设置背景
		if (this.setBg) {
			this.setBg = false;
			gameBox.border.style.backgroundColor = '#666';
			cxt.bg.clearRect(0 , 0 , cxt.w , cxt.h);
			cxt.bg.drawImage(oImg.brick , 15*32 , 0 , 32, 32 , 32*6+35 , 12*32+20 , 32 , 32);
		}
		cxt.role.clearRect(this.x , this.y , 32 , 32);
		// 如果有按键被按下
		if (keyPressed) {
			this.key();
		}
		cxt.role.drawImage(oImg.myTank , 0 , 0 , 32 , 32 , this.x , this.y , 32 , 32);
	}

	// 这里不用switch来进行判断是因为如果使用数组来存储按键的状态，那么会出现
	// 在两个按键同时被按下的时候（这个时候两个按键的状态都是真），坦克的方向
	// 只会按照switch的优先级来进行移动
	//
	// 基本上如果这里要使用keyval来确定接下来怎么执行，那么一定要对按键进行判断，因为keyVal
	// 会变化
	key(){
		// 上下左右被按下
		if (keyVal === 87 || keyVal === 83 || keyVal === 65 || keyVal === 68) {
			this.move[keyVal]();
			if (this.brickNumSave) {
				this.brickNum --;
				this.brickNumSave = false;
			}
		}
		// 确认
		if (keyVal === 72) {
			if (this.x === 192 && this.y === 384) {
				keyPressed = false;
				return;
			}
			this.brickNum < 13 ? this.brickNum ++ : this.brickNum = 1;
			this.brickNumSave = true;
			cxt.bg.clearRect(35 + this.x , 20 + this.y , 32 , 32);
			cxt.bg.drawImage(oImg.brick , 32*this.brickNum , 0 , 32 , 32 , 35 + this.x , 20 + this.y , 32 , 32);
			mapData[0][this.x/32][this.y/32] = this.brickNum;
		}
		keyPressed = false;
	}
}
