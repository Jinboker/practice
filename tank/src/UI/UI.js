// 关卡相关
let stage = {
	//当mode为0时表示单人模式
	//当mode为1时表示双人模式
	//当mode为2时表示自定义地图模式
	mode : null,

	//关卡数
	num : 1,

	//关卡UI的状态
	//默认为0，当为0的时候表示幕布上下合拢
	//当为1的时候表示关卡选择界面
	status : 0
};

let ui = {
	//为0时表示开始的UI，默认为0
	//为1时表示关卡的UI
	//为2时表示记分的UI
	//为3时表示游戏结束
	status : 0
};

// UI相关执行函数
class UI {
	constructor() {
		this.startY;
	}

	init(){
		this.uiImage = new Image;
		this.uiImage.src = 'src/UI/UI.png';

		// 开始的UI的相关变量
		this.startY = bottomH;          // 开始画面上移的y值
		this.moveToTop = false;         //moveToTop为真就表示开始画面已经运动到了最终位置
		this.modeChoose = 252;          // 开始画面上小坦克的纵向位置
		this.wheel = 0;                 //wheel表示轮子的变化0 -> 1 -> 0 -> 1
		this.num = 0;                   //num表示需要延迟几个循环才去显示轮子的变化

		// 关卡选择界面的相关变量
		this.curtainHeight = 0;         //当幕布开始上下合拢时，幕布的高度
		this.maxCurtainHeight = bottomH * 0.5;
		this.bgWidth = 0;               //当幕布开始左右分开时，游戏界面的宽度的一半
	}

	draw(){
		switch (ui.status) {
			case 0:
				this.gameStart();
				break;
			case 1:
				this.gameStage();
				break;
			case 2:
				this.gameScore();
				break;
			default:
				break;
		}
	}

	// 最开始的UI界面
	gameStart(){
		// 画面没有到最终位置
		if (!this.moveToTop) {
			// 检测是否有按下回车，如果按下，那么直接显示最后的画面而不继续运动
			roleCtrl[keyVal.enter] ? this.startY = 96 : this.startY -= 3;

			//更新开始界面的图片和文字
			cxtBottom.save();
			cxtBottom.font = "22px Arial black";      //这里的字体就叫 Arial black！！
			cxtBottom.fillStyle = "white";
			cxtBottom.clearRect(0 , 0 , bottomW , bottomH);
			cxtBottom.fillText("I-         00   HI-20000", 50, this.startY - 25);
			cxtBottom.fillText("1 PLAYER", 190, this.startY + 200);
			cxtBottom.fillText("2 PLAYERS", 190, this.startY + 230);
			cxtBottom.fillText("CONSTRUCTION", 190, this.startY + 260);
			cxtBottom.drawImage(this.uiImage , 0 , 0 , 376 , 159 , 70 , this.startY , 376 , 160);
			cxtBottom.restore();

			if (this.startY === 96) {
				pressedKey = false;                    // 强制让表示有按键被按下的值为假，防止一直按着某个按键然后一直触发，下面同样的语句都是这个用处
				this.moveToTop = true;                 //运动到终点后不再刷新画面
			}

		// 画面到了最终位置
		} else {
			cxtTop.clearRect(105 , 0 , 32 , topH);
			cxtTop.drawImage(myTankImage , 0 ,  64 + this.wheel * 32 , 32 , 32 , 105 , this.modeChoose , 32 , 32);
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
						this.modeChoose < 312 ?  this.modeChoose += 30 : this.modeChoose = 252;   //这个是指向模式的坦克的位置确定的语句，下面类似
						pressedKey = false;
						break;
					// 检测向上的按键
					case roleCtrl[keyVal.up1]:
						this.modeChoose > 252 ?  this.modeChoose -= 30 : this.modeChoose = 312;
						pressedKey = false;
						break;
					// 检测回车
					case roleCtrl[keyVal.enter]:
						ui.status = 1;         //进入关卡界面的UI
						stage.mode = (this.modeChoose - 252) / 30;    //确定选择的模式
						// 清空画布方便关卡选择界面去重绘
						cxtBottom.clearRect(0 , 0 , bottomW , bottomH);
						cxtTop.clearRect(105 , 0 , 32 , topH);
						pressedKey = false;
						break;
					default:
						pressedKey = false;
						break;
				}
			}
		}
	}

	// 关卡选择UI界面
	gameStage(){

		switch (stage.status) {
			// 上下两布幕合拢
			case 0:
				cxtBottom.save();
				cxtBottom.fillStyle = '#666';
				cxtBottom.fillRect(0 , 0 ,bottomW , this.curtainHeight);   //上幕布
				cxtBottom.fillRect(0 , bottomH - this.curtainHeight ,bottomW , this.curtainHeight);   //下幕布
				cxtBottom.restore();
				this.curtainHeight <= this.maxCurtainHeight ? this.curtainHeight += 15 : stage.status = 1;
				break;
			// 关卡选择
			case 1:
				cxtTop.save();
				cxtTop.font = "22px Arial black";
				cxtTop.fillStyle = '#fff';
				cxtTop.clearRect(0 , 0 , topW , topH);
				cxtTop.fillText("STAGE   " + stage.num , 160 , 220);
				cxtTop.restore();
				if (roleCtrl[keyVal.enter]) {
					cxtTop.clearRect(0 , 0 , topW , topH);
					pressedKey = false;
					draw.map = true;       //循环开始绘制背景地图
					stage.status = 2;      //左右幕布拉开
				}
				break;
			// 左右两幕布拉开
			case 2:
				cxtBottom.clearRect(243 - this.bgWidth , 20 , 2 * this.bgWidth , topH);
				if (this.bgWidth < 208) {
					this.bgWidth += 16;
				} else {
					draw.tank = true;          //循环开始绘制坦克
					draw.ui = false;           //循环停止绘制UI界面
					stage.status = 3;          //进入计分UI
				}
				break;
		}
	}

	// 计分的界面
	gameScore(){

	}
}
