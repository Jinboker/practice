let setMapInit = true;

// 设置地图
class SetMap{
	constructor(){
		this.x;
		this.y;

		this.setMapData = new Array(13);
	}

	init(){
		for (let i = 0; i < 13; i++) {
			this.setMapData[i] = new Array(13);
		}
		this.setMapData[12][6] = 15;         // 设置老家的砖块

		this.delay = new Delay();

		this.ensureMap = true;

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
		// 初始化相关设置
		if (setMapInit) {
			this.x = 0;
			this.y = 0;
			setMapInit = false;
			gameBox.border.style.backgroundColor = '#666';
			cxt.bg.clearRect(0 , 0 , cxt.w , cxt.h);
			for (let i = 0; i < 13; i++) {
				for(let j = 0; j < 13; j++){
					this.setMapData[i][j] && cxt.bg.drawImage(oImg.brick , 32 * this.setMapData[i][j] , 0 , 32 , 32 , 35+32*j , 20+32*i , 32, 32);
				}
			}
			this.ensureMap = true;
		}
		cxt.role.clearRect(this.x , this.y , 32 , 32);
		// 如果有按键被按下
		if (keyPressed) {
			this.key();
		}
		this.ensureMap && cxt.role.drawImage(oImg.myTank , 0 , 0 , 32 , 32 , this.x , this.y , 32 , 32);
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
		// 更换地形(H键)
		if (keyVal === 72) {
			if (this.x === 192 && this.y === 384) {
				keyPressed = false;
				return;
			}
			this.brickNum < 13 ? this.brickNum ++ : this.brickNum = 0;
			this.brickNumSave = true;
			cxt.bg.clearRect(35 + this.x , 20 + this.y , 32 , 32);
			cxt.bg.drawImage(oImg.brick , 32*this.brickNum , 0 , 32 , 32 , 35 + this.x , 20 + this.y , 32 , 32);
			this.setMapData[this.y/32][this.x/32] = this.brickNum;
		}
		// 确认地图完成（回车）
		if (keyVal === 13) {
			mapData[0] = this.setMapData;
			draw.setMap = false;
			draw.ui = true;
			gameBox.border.style.backgroundColor = '';
			cxt.bg.clearRect(0 , 0 , cxt.w , cxt.h);
			cxt.role.clearRect(this.x , this.y , 32 , 32);
			this.ensureMap = false;
			ui.status = 0;
			ui.moveToTop = false;
		}
		keyPressed = false;
	}
}
