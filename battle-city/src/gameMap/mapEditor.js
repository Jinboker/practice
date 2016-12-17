// 设置地图
class MapEditor{
	constructor(){
		this.x = 0;
		this.y = 0;

		// 设置初始的地图数据，全部为空
		this.setMapData = [13];
		for (let i = 0; i < 13; i++) {
			this.setMapData[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}

		// 设置老家的砖块图形
		this.setMapData[12][6] = 15;


		this.ensureMap = true;
		this.drawTankAble = true;     // 是否需要重绘坦克
		this.brickNum = 0;            // 砖块改变的计数
		this.brickNumSave = false;

		this.move = {};
		this.tankMove();
	}

	tankMove(){
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

	key(){
		// 上下左右被按下
		if (keyDir_1 && keyInfo[keyDir_1].pressed) {
			this.move[keyDir_1]();
			if (this.brickNumSave) {
				this.brickNum --;
				this.brickNumSave = false;
			}
		}
		// 更换地形(J键)
		if (keyCode === 74) {
			bChangeMap = true;                       //地图有被改变
			if (this.x === 192 && this.y === 384) {
				keyPressed = false;
				return;
			}
			this.brickNum < 13 ? this.brickNum ++ : this.brickNum = 0;
			this.brickNumSave = true;
			cxt.bg.clearRect(35 + this.x, 20 + this.y, 32, 32);
			cxt.bg.drawImage(oImg.brick, 32*this.brickNum, 0, 32, 32, 35 + this.x, 20 + this.y, 32, 32);
			this.setMapData[this.y/32][this.x/32] = this.brickNum;
		}
		// 确认地图完成（H键）
		if (keyCode === 72) {
			// 如果地图有被改变过，那么将新的地图数据覆盖默认的数据
			if (bChangeMap) {
				mapData[0] = this.setMapData;
				bChangeMap = false;
			}
			draw.setMap = false;
			draw.ui = true;
			canRol.style.zIndex = '';
			gameBox.border.style.backgroundColor = '';
			cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
			cxt.role.clearRect(this.x, this.y, 32, 32);
			this.ensureMap = false;
			ui.status = 0;
			ui.moveToTop = false;
		}
		keyPressed = false;
	}

	draw(){
		// 初始化相关设置
		if (setMapInit) {
			setMapInit = false;
			canRol.style.zIndex = '1';
			gameBox.border.style.backgroundColor = '#666';
			cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
			for (let i = 0; i < 13; i++) {
				for(let j = 0; j < 13; j++){
					this.setMapData[i][j] && cxt.bg.drawImage(oImg.brick, 32 * this.setMapData[i][j], 0, 32, 32, 35+32*j, 20+32*i, 32, 32);
				}
			}
			this.ensureMap = true;
		}
		cxt.role.clearRect(this.x, this.y, 32, 32);
		// 如果有按键被按下
		if (keyPressed) {
			this.key();
		}
		this.ensureMap && cxt.role.drawImage(oImg.myTank, 0, 0, 32, 32, this.x, this.y, 32, 32);
	}
}
