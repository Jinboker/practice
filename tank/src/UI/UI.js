// 关卡相关
let stage = {
	mode : null,    //当mode为0时表示单人模式
					//当mode为1时表示双人模式
					//当mode为2时表示自定义地图模式

	num : 1,        //关卡数

	status : 0      //关卡UI的状态
					//默认为0，当为0的时候表示幕布上下合拢
					//当为1的时候表示关卡选择界面
					//当为2的时候表示幕布左右拉开
};

let ui = {
	status : 0           //为0时表示开始的UI，默认为0
						 //为1时表示关卡的UI
						 //为2时表示正在游戏的UI
						 //为3时表示记分的UI
						 //为4时表示游戏结束


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

		// 开始的UI的相关变量
		this.startY = canHeight;        // 开始画面上移的y值
		this.moveToTop = false;         //moveToTop为真就表示开始画面已经运动到了最终位置
		this.modeChoose = 272;          // 开始画面上小坦克的纵向位置
		this.wheel = 0;                 //wheel表示轮子的变化0 -> 1 -> 0 -> 1
		this.num = 0;                   //num表示需要延迟几个循环才去显示轮子的变化

		// 关卡选择界面的相关变量
		this.curtainHeight = 0;         //当幕布开始上下合拢时，幕布的高度
		this.curtainWidth = canWidth * 0.5;   //当幕布开始左右分开时，幕布的宽度
		this.maxCurtainHeight = canHeight * 0.5;


	}

	draw(){
		switch (ui.status) {
			case 0:
				this.gameStart();
				break;
			case 1:
				this.gameStage();
				break;
			default:
				break;
		}
	}

	// 最开始的UI界面
	gameStart(){
		cxtBottom.save();
		cxtBottom.font = "22px Arial black";      //这里的字体就叫 Arial black！！
		cxtBottom.fillStyle = "white";

		// 画面没有到最终位置
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
				pressedKey = false;                    // 强制让表示有按键被按下的值为假，防止一直按着某个按键然后一直触发，下面同样的语句都是这个用处
			}

		// 画面到了最终位置
		} else {
			cxtTop.clearRect(0 , 0 , canWidth , canHeight);
			cxtTop.drawImage(myTankImage , 0 ,  64 + this.wheel * 32 , 32 , 32 , 140 , this.modeChoose , 32 , 32);
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
						this.modeChoose < 332 ?  this.modeChoose += 30 : this.modeChoose = 272;   //这个是指向模式的坦克的位置确定的语句，下面类似
						pressedKey = false;
						break;
					// 检测向上的按键
					case roleCtrl[keyVal.up1]:
						this.modeChoose > 272 ?  this.modeChoose -= 30 : this.modeChoose = 332;
						pressedKey = false;
						break;
					// 检测回车
					case roleCtrl[keyVal.enter]:
						ui.status = 1;         //进入游戏界面的UI
						stage.mode = (this.modeChoose - 272) / 30;    //确定选择的模式
						// 清空画布方便关卡选择界面去重绘
						cxtBottom.clearRect(0 , 0 , canWidth , canHeight);
						cxtTop.clearRect(0 , 0 , canWidth , canHeight);
						pressedKey = false;
						break;
					default:
						pressedKey = false;
						break;
				}
			}
		}
		cxtBottom.restore();
	}

	// 关卡选择UI界面
	gameStage(){
		cxtTop.save();
		switch (stage.status) {
			case 0:
				// 幕布上下合拢
				cxtTop.fillStyle = '#666';
				this.curtainHeight <= this.maxCurtainHeight ? this.curtainHeight += 8 : stage.status = 1;  //判断幕布是否闭合，如果闭合则进入下一个状态
				cxtTop.fillRect(0 , 0 ,canWidth , this.curtainHeight);   //上幕布
				cxtTop.fillRect(0 , canHeight - this.curtainHeight ,canWidth , this.curtainHeight);   //下幕布
				break;
			case 1:
				// 渲染关卡选择界面
				cxtTop.clearRect(0, 0, canWidth , canHeight);
				cxtTop.fillStyle = '#666';
				cxtTop.fillRect(0 , 0 , canWidth , canHeight);
				cxtTop.fillStyle = 'black';
				cxtTop.font = "22px Arial black";
				cxtTop.fillText("STAGE   " + stage.num , 200 , 240);
				if (roleCtrl[keyVal.enter]) {
					stage.status = 2;
				}
				break;
			case 2:
				// 幕布左右拉开
				cxtTop.clearRect(0 , 0 ,canWidth , canHeight);
				cxtTop.fillStyle = '#666';
				this.curtainWidth >= 0 ? this.curtainWidth -= 8 : stage.status = 3;
				cxtTop.fillRect(0 , 0 ,this.curtainWidth , canHeight);     //左幕布
				cxtTop.fillRect(canHeight - this.curtainWidth , 0 , this.curtainWidth , canHeight);    //右幕布
				break;
			default:
				break;
		}
		cxtTop.restore();
	}
}
