// 关卡相关
let stage = {
	mode : null,    //当mode为1时表示单人模式
					//当mode为2时表示双人模式
					//当mode为3时表示自定义地图模式

	num : 1         //关卡总数
};

let ui = {
	status : 0           //当为0时表示开始的UI，默认为0
						 //当为1时表示正在游戏的UI
						 //当为2时表示记分的UI
						 //当为3时表示游戏结束
};

let uiImage;

// UI相关执行函数
class UI {
	constructor() {
		this.startY;
	}

	init(){
		this.uiImage = new Image();
		this.uiImage.src = 'src/UI/UI.png';

		// 开始画面上移的y值
		this.startY = canHeight;
		this.moveToTop = false;

		// 模式选择
		this.modeChoose = 272;

		this.wheel = 0;
		this.num = 0;
	}

	draw(){
		switch (ui.status) {
			case 0:
				this.gameStart();
				break;
			default:
				break;
		}
	}

	gameStart(){
		cxtBottom.save();
		cxtBottom.font = "22px Arial black";      //这里的字体就叫 Arial black！！
		cxtBottom.fillStyle = "white";

		// 检查是否运动到了最终位置
		if (!this.moveToTop) {
			// 检测是否有按下回车，如果按下，那么直接显示最后的画面而不继续运动
			if (roleCtrl[keyVal.enter]) {
				this.startY = 96;
			} else {
				if (this.startY > 96) {
					this.startY = this.startY - 2.5;
				}
			}

			//更新开始界面的图片和文字
			cxtBottom.clearRect(0 , 0 , canWidth , canHeight);
			cxtBottom.fillText("I-         00   HI-20000", 36, this.startY - 25);
			cxtBottom.fillText("1 PLAYER", 190, this.startY + 200);
			cxtBottom.fillText("2 PLAYERS", 190, this.startY + 230);
			cxtBottom.fillText("CONSTRUCTION", 190, this.startY + 260);
			cxtBottom.drawImage(this.uiImage , 0 , 0 , 376 , 159 , 70 , this.startY , 376 , 160);

			if (this.startY === 96) {
				this.moveToTop = true;                 //运动到终点后不再刷新画面
				roleCtrl[keyVal.enter] = false;        //检测到回车按下后就将回车键的状态设置为假（不管有没有松开按键）
													   //主要是为了防止键盘误触发
			}
		} else {
			//运动到终点后开始绘制用来选择的坦克
			cxtTop.clearRect(0 , 0 , canWidth , canHeight);
			// 每循环5次就改变一次轮胎
			if (this.num < 5) {
				this.num ++;
			} else {
				this.wheel = +!this.wheel;
				this.num = 0;
			}
			// 如果有按键按下则检测是哪一个按键并执行相应的操作
			if (pressedKey) {
				switch (true) {
					// 检测向下的按键
					case roleCtrl[keyVal.down1]:
						this.modeChoose < 332 ?  this.modeChoose += 30 : this.modeChoose = 272;
						roleCtrl[keyVal.down1] = pressedKey = false;
						break;
					// 检测向上的按键
					case roleCtrl[keyVal.up1]:
						this.modeChoose > 272 ?  this.modeChoose -= 30 : this.modeChoose = 332;
						roleCtrl[keyVal.up1] = pressedKey = false;
						break;
					// 检测回车
					case roleCtrl[keyVal.enter]:
						roleCtrl[keyVal.enter] = pressedKey = false;
						break;
					default:
						pressedKey = false;
						break;
				}
			}

			cxtTop.drawImage(myTankImage , 0 ,  64 + this.wheel * 32 , 32 , 32 , 140 , this.modeChoose , 32 , 32);
		}
		cxtBottom.restore();
	}
}
