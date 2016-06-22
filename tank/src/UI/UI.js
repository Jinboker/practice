// 关卡相关
let stage = {
	//当mode为0时表示单人模式
	//当mode为1时表示双人模式
	//当mode为2时表示自定义地图模式
	mode : 0,

	//当为0的时候表示幕布上下合拢
	//当为1的时候表示关卡选择界面
	//当为2的时候表示左右幕布拉开
	status : 0,

	//当前关卡数
	num : 1,
	//最大关卡数
	max : 10
};

let ui = {
	//为0时表示开始的UI，默认为0
	//为1时表示关卡的UI
	//为2时表示记分的UI
	//为3时表示游戏结束
	status : 0,

	moveToTop : false
};

// UI相关执行函数
class UI {
	constructor() {
		this.startY;
	}

	init(){
		this.delay = new Delay();      //延迟执行
		this.audPlay = true;           //是否开始播放音频
		// 开始的UI的相关变量
		this.startY = cxt.h;          // 开始画面上移的y值
		// this.moveToTop = false;         //moveToTop为真就表示开始画面已经运动到了最终位置
		this.modeChoose = 272;          // 开始画面上小坦克的纵向位置
		this.wheel = 0;                 //wheel表示轮子的变化0 -> 1 -> 0 -> 1
		// 关卡选择界面的相关变量
		this.curtainHeight = 0;         //当幕布开始上下合拢时，幕布的高度
		this.maxCurtainHeight = cxt.h * 0.5;
		this.nextAble = false;          //是否允许进入下一个stage.status
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
		if (!ui.moveToTop) {
			// 检测是否有按下确认键（H键），如果按下，那么直接显示最后的画面而不继续运动
			keyInfo[72].pressed ? this.startY = 96 : this.startY -= 3;
			//更新开始界面的图片和文字
			cxt.bg.save();
			cxt.bg.font = "15px prstart";
			cxt.bg.fillStyle = "white";
			cxt.bg.clearRect(0 , 0 , cxt.w , cxt.h);
			cxt.bg.fillText("I-         00   HI-20000", 50, this.startY - 25);
			cxt.bg.fillText("1 PLAYER", 190, this.startY + 200);
			cxt.bg.fillText("2 PLAYERS", 190, this.startY + 230);
			cxt.bg.fillText("CONSTRUCTION", 190, this.startY + 260);
			cxt.bg.drawImage(oImg.ui , 0 , 0 , 376 , 159 , 70 , this.startY , 376 , 160);
			cxt.bg.restore();

			if (this.startY === 96) {
				keyPressed = false;                    // 强制让表示有按键被按下的值为假，防止一直按着某个按键然后一直触发，下面同样的语句都是这个用处
				ui.moveToTop = true;                    //运动到终点后不再刷新画面
			}
		// 画面到了最终位置
		} else {
			cxt.bg.clearRect(140 , 260 , 32 , 120);
			cxt.bg.drawImage(oImg.myTank , 0 ,  64 + this.wheel * 32 , 32 , 32 , 140 , this.modeChoose , 32 , 32);
			// 每循环5次就改变一次轮胎
			this.delay.do(() => this.wheel = +!this.wheel , 5);
			// 如果有按键按下则检测是哪一个按键并执行相应的操作
			if (keyPressed) {
				keyPressed = false;
				switch (keyCode) {
					// 向下
					case 83: this.modeChoose < 332 ?  this.modeChoose += 30 : this.modeChoose = 272; break;
					// 向上
					case 87: this.modeChoose > 272 ?  this.modeChoose -= 30 : this.modeChoose = 332; break;
					// 确认按键H
					case 72:
						this.delay.num = 0;          //重置延迟循环计数
						stage.mode = (this.modeChoose - 272) / 30;    //确定选择的模式
						if (stage.mode === 2) {
							draw.ui = false;         //选择自定义模式那么关闭ui的绘制
							draw.setMap = true;      //开启地图编辑模式
							setMapInit = true;
						}else {
							ui.status = 1;           //下次循环直接进入下一个ui的状态
							this.moveToTop = false;  //下次进入这个状态画面重新开始运动
						}
						cxt.bg.clearRect(0 , 0 , cxt.w , cxt.h);
						break;
					default:
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
				cxt.bg.save();
				cxt.bg.fillStyle = '#666';
				cxt.bg.fillRect(0 , 0 , cxt.w , this.curtainHeight);   //上幕布
				cxt.bg.fillRect(0 , cxt.h - this.curtainHeight , cxt.w , this.curtainHeight);   //下幕布
				cxt.bg.restore();
				if (this.curtainHeight <= this.maxCurtainHeight) {
					this.curtainHeight += 15;
				} else {
					//改变背景颜色是为了bg层清除右边边框内容时不需要再重绘#666色的背景了，直接显示背景色就好了
					gameBox.border.style.backgroundColor = '#666';
					stage.status = 1;
				}
				break;
			// 关卡选择
			case 1:
				//绘制当前关卡
				cxt.role.save();
				cxt.role.font = "20px prstart";
				cxt.role.fillStyle = '#000';
				cxt.role.clearRect(0 , 0 , cxt.l , cxt.l);
				cxt.role.fillText("STAGE   " + stage.num , 140 , 220);
				cxt.role.restore();
				// 键盘选择
				if (keyPressed) {
					keyPressed = false;
					switch (keyCode) {
						//向下
						case 83: stage.num = stage.num < stage.max ? stage.num + 1 : 1; break;
						//向上
						case 87: stage.num = stage.num > 1 ? stage.num - 1 : stage.max; break;
						//确认
						case 72:
							// 开始播放开始音乐,只播放一次
							if (this.audPlay) {
								oAud.start.play();
								this.audPlay = false;
								this.nextAble = true;     //开始播放音乐后允许进入下一个stage.status
							}
							break;
						default:
							break;
					}
				}
				// 开始播放音乐后this.nextAble为真，那么延迟80个循环后开始进入下一个UI状态
				if (this.nextAble) {
					this.delay.do(() => {
						cxt.role.clearRect(0 , 0 , cxt.l , cxt.l);
						cxt.bg.clearRect(0 , 0 , cxt.w , cxt.h);
						cxt.role.save();
						cxt.role.fillStyle = '#666';
						cxt.role.fillRect(0 , 0 , cxt.l , cxt.l);
						cxt.role.restore();
						draw.map = true;       //循环开始绘制背景地图
						stage.status = 2;      //左右幕布拉开
						this.audPlay = true;   //重置this.audPlay的值，为下一次播放音乐做准备
					} , 80);
				}
				break;
			// 左右两幕布拉开
			case 2:
				cxt.role.clearRect(208 - this.bgWidth , 0 , 2 * this.bgWidth , cxt.l);   // 通过不断清空cxt.role上某个区域来模拟幕布拉开
				if (this.bgWidth < 208) {
					this.bgWidth += 16;
				} else {
					canBg.style.zIndex = '1';  //让背景层在上面显示主要是树林会遮盖住坦克
					draw.tank = true;          //循环开始绘制坦克
					draw.misc = true;          //循环开始绘制杂项
					draw.enemyNum = true;      //循环开始绘制敌军坦克数量信息
					draw.ui = false;           //停止绘制UI界面
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
