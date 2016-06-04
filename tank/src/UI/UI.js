// 关卡相关
let stage = {
	//当mode为0时表示单人模式
	//当mode为1时表示双人模式
	//当mode为2时表示自定义地图模式
	mode : 0,

	//关卡数
	num : 1,

	//当为0的时候表示幕布上下合拢
	//当为1的时候表示关卡选择界面
	//当为2的时候表示左右幕布拉开
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
		this.num = 0;                   //主要用在this.delay()方法中，表示延迟几个循环
		this.audPlay = true;           //是否开始播放音频
		// 开始的UI的相关变量
		this.startY = bottomH;          // 开始画面上移的y值
		this.moveToTop = false;         //moveToTop为真就表示开始画面已经运动到了最终位置
		this.modeChoose = 252;          // 开始画面上小坦克的纵向位置
		this.wheel = 0;                 //wheel表示轮子的变化0 -> 1 -> 0 -> 1
		// 关卡选择界面的相关变量
		this.curtainHeight = 0;         //当幕布开始上下合拢时，幕布的高度
		this.maxCurtainHeight = bottomH * 0.5;
		this.nextAble = false;          //是否允许进入下一个stage.status
		this.bgWidth = 0;               //当幕布开始左右分开时，游戏界面的宽度的一半
	}

	delay(fn , num){
		if (this.num < num) {
			this.num ++;
		} else {
			fn();
			this.num = 0;
			a();
		}
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
			cxtBottom.drawImage(oImg.ui , 0 , 0 , 376 , 159 , 70 , this.startY , 376 , 160);
			cxtBottom.restore();

			if (this.startY === 96) {
				hasPressedKey = false;                    // 强制让表示有按键被按下的值为假，防止一直按着某个按键然后一直触发，下面同样的语句都是这个用处
				this.moveToTop = true;                 //运动到终点后不再刷新画面
			}

		// 画面到了最终位置
		} else {
			cxtTop.clearRect(105 , 0 , 32 , topH);
			cxtTop.drawImage(oImg.myTank , 0 ,  64 + this.wheel * 32 , 32 , 32 , 105 , this.modeChoose , 32 , 32);
			// 每循环5次就改变一次轮胎
			this.delay(() => this.wheel = +!this.wheel , 5);
			// 如果有按键按下则检测是哪一个按键并执行相应的操作
			if (hasPressedKey) {
				switch (true) {
					// 检测向下的按键
					case roleCtrl[keyVal.down1]:
						//小坦克的位置
						this.modeChoose < 312 ?  this.modeChoose += 30 : this.modeChoose = 252;
						hasPressedKey = false;
						break;
					// 检测向上的按键
					case roleCtrl[keyVal.up1]:
						this.modeChoose > 252 ?  this.modeChoose -= 30 : this.modeChoose = 312;
						hasPressedKey = false;
						break;
					// 检测回车
					case roleCtrl[keyVal.enter]:
						this.num = 0;          //重置延迟循环计数
						ui.status = 1;         //进入关卡界面的UI
						stage.mode = (this.modeChoose - 252) / 30;    //确定选择的模式
						// 清空画布方便关卡选择界面去重绘
						cxtBottom.clearRect(0 , 0 , bottomW , bottomH);
						cxtTop.clearRect(105 , 0 , 32 , topH);
						hasPressedKey = false;
						break;
					default:
						hasPressedKey = false;
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
				//绘制当前关卡
				cxtTop.save();
				cxtTop.font = "22px Arial black";
				cxtTop.fillStyle = '#fff';
				cxtTop.clearRect(0 , 0 , topW , topH);
				cxtTop.fillText("STAGE   " + stage.num , 160 , 220);
				cxtTop.restore();
				// 键盘选择
				if (roleCtrl[keyVal.enter]) {
					hasPressedKey = false;
					// 开始播放开始音乐,只播放一次
					if (this.audPlay) {
						oAud.start.play();
						this.audPlay = false;
						this.nextAble = true;     //开始播放音乐后允许进入下一个stage.status
						a();
					}
				}
				// 如果开始播放音乐，那么延迟个循环后开始进入下一个UI状态
				if (this.nextAble) {
					this.delay(() => {
						cxtTop.clearRect(0 , 0 , topW , topH);
						draw.map = true;       //循环开始绘制背景地图
						stage.status = 2;      //左右幕布拉开
						this.audPlay = true;   //重置this.audPlay的值，为下一次播放音乐做准备
					} , 80);
				}
				break;
			// 左右两幕布拉开
			case 2:
				cxtBottom.clearRect(243 - this.bgWidth , 20 , 2 * this.bgWidth , topH);   // 通过不断清空cxtBottom上某个区域来模拟幕布拉开
				if (this.bgWidth < 208) {
					this.bgWidth += 16;
				} else {
					draw.tank = true;          //循环开始绘制坦克
					draw.ui = false;           //循环停止绘制UI界面
					stage.status = 3;          //进入计分UI
				}
				break;
			default:
				break;
		}
	}

	// 计分的界面
	gameScore(){

	}
}
