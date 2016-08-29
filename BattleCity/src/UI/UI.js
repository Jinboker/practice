/**
 * 初始化一些变量
 */
function paraInit() {
	ui = {
		status: 0,                             // 0表开始UI，1表关卡UI，2表记分UI，3表游戏暂停，4表游戏结束
		moveToTop: false,                      // 开始UI中图片是否运动到了顶部
		bInGame: false,                        // 是否正在游戏中
		bIntoNext: false                       // 是否直接进入下一关
	};

	stage = {
		mode: 0,                               // 0表单人模式，1表双人模式，2表自定义地图模式
		status: 0,                             // 0表幕布上下合拢，1表关卡选择界面，2表关卡等待界面，3表左右幕布拉开
		num: 1,                                // 当前关卡数
		max: 10                                // 最大关卡数
	};
}

// UI相关执行函数
class UI {
	constructor() {
		// 开始界面
		this.iWheelDelay = 5;                // 坦克轮胎隔5个循环改变一次
		this.iWheelPic = 0;                  // wheel表示轮子的变化0 -> 1 -> 0 -> 1

		// 关卡选择
		this.iStartMusicDelay = 80;          // 开始播放开始音乐，80个循环后拉开幕布
		this.iDelayEnterNext = 30;           // 如果正在游戏，那么30个循环后进入下一关

		// 暂停
		this.iTxtDelay = 20;                 // 文字每过10个循环消失或者出现一次
		this.iTxtStatus = 0;                 // 文字的状态0 -> 1 -> 0 -> 1

		// 计分
		this.iScoreDelay = 5;                // 分数变化的速度，5个循环
		this.bEnterNextStage = false;        // 进入下一关

		// 游戏结束
		this.iOverStatus = 0;                // 0表文字上移，1表等待，2表结束页面
		this.iOverY = 456;                   // 文字的Y坐标

		this.iDelay = 120;                   // 积分和游戏结束里面比较长的延时都是这个
	}

	init(){
		paraInit();
		this.gameStartInit();                // 开始的UI的相关变量初始化
		this.gameStageInit();                // 关卡选择界面的相关变量初始化
		this.gameScoreInit();                // 计分界面的相关变量初始化
		this.gameOverInit();                 // 游戏结束界面相关变量初始化
	}

	draw(){
		switch (ui.status) {
			case 0: this.gameStart(); break;
			case 1: this.gameStage(); break;
			case 2: this.gameScore(); break;
			case 3: this.gameStop(); break;
			case 4: this.gameOver(); break;
			default: break;
		}
	}

	gameStartInit(){
		this.startY = cxt.h;                 // 开始画面上移的y值
		this.modeChoose = 272;               // 开始画面上小坦克的纵向位置
	}

	gameStageInit(){
		this.curtainHeight = 0;              // 当幕布开始上下合拢时，幕布的高度
		this.bgWidth = 0;                    // 当幕布开始左右分开时，游戏界面的宽度的一半
	}

	gameScoreInit(){
		this.iTankScore = 1;                 // 当前显示的是第几个坦克的分数
		this.bTankScoreAdd = false;          // this.iTankScore的值是否增加
		this.bDrawTotal = false;             // 是否开始绘制击杀的坦克总数
		this.iScoreNum = [0, 0, 0, 0];       // 当前显示击杀掉的坦克数
	}

	gameOverInit(){
		this.bSetGameOver = true;            // 是否开始设置游戏结束界面
	}

	startInit(){
		iEatBouns = 0;                       // 吃掉的奖励数重置
		oScore.tankNum = [0, 0, 0, 0];       // 击杀坦克数目重置
		oEnemy.iBornDelay = 30;              // 重置NPC出生的延迟
		this.iOverStatus = 0;                // 重置游戏结束后的文字状态
		this.iOverY = 456;                   // 重置gameover文字的Y坐标
		cxt.misc.clearRect(0, 0, cxt.w, cxt.h);
	}

	// 最开始的UI界面
	gameStart(){
		// 画面没有到最终位置
		if (!ui.moveToTop) {
			// 检测是否有按下确认键（H键），如果按下，那么直接显示最后的画面而不继续运动
			keyInfo[72].pressed ? this.startY = 96 : this.startY -= 3;
			// 更新开始界面的图片和文字
			cxt.bg.save();
			cxt.bg.fillStyle = "white";
			cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
			cxt.bg.fillText("I-         00   HI-20000", 50, this.startY - 25);
			cxt.bg.fillText("1 PLAYER", 190, this.startY + 200);
			cxt.bg.fillText("2 PLAYERS", 190, this.startY + 230);
			cxt.bg.fillText("CONSTRUCTION", 190, this.startY + 260);
			cxt.bg.drawImage(oImg.ui, 0, 0, 376, 159, 70, this.startY, 376, 160);
			cxt.bg.restore();

			if (this.startY === 96) {
				keyPressed = false;                     // 强制让表示有按键被按下的值为假，防止一直按着某个按键然后一直触发，下面同样的语句都是这个用处
				ui.moveToTop = true;                    // 运动到终点后不再刷新画面
			}
		// 画面到了最终位置
		} else {
			cxt.bg.clearRect(140, 260, 32, 120);
			cxt.bg.drawImage(oImg.myTank, 0,  64 + this.iWheelPic * 32, 32, 32, 140, this.modeChoose, 32, 32);
			// 每循环5次就改变一次轮胎
			this.iWheelDelay = delay(this.iWheelDelay, 5, () => {
				this.iWheelPic = +!this.iWheelPic;
			});
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
						stage.mode = (this.modeChoose - 272) / 30;    // 确定选择的模式
						if (stage.mode === 2) {
							draw.ui = false;         // 选择自定义模式那么关闭ui的绘制
							draw.setMap = true;      // 开启地图编辑模式
							setMapInit = true;
						}else {
							ui.status = 1;           // 下次循环直接进入下一个ui的状态
							this.moveToTop = false;  // 下次进入这个状态画面重新开始运动
						}
						cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
						break;
					default: break;
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
				cxt.bg.fillRect(0, 0, cxt.w, this.curtainHeight);   // 上幕布
				cxt.bg.fillRect(0, cxt.h - this.curtainHeight, cxt.w, this.curtainHeight);   // 下幕布
				cxt.bg.restore();
				// 如果this.curtainHeight的值大于canvas高度的一半那么表明幕布已经运动至终点
				if (this.curtainHeight <= 228) {
					this.curtainHeight += 15;
				} else {
					this.styleChange();
					stage.status = 1;
				}
				break;
			// 关卡选择
			case 1:
				// 绘制当前关卡
				cxt.misc.save();
				cxt.misc.font = "20px prstart";
				cxt.misc.fillStyle = '#000';
				cxt.misc.clearRect(0, 0, cxt.l, cxt.l);
				cxt.misc.fillText("STAGE  " + stage.num, 180, 240);
				cxt.misc.restore();
				// 看此时是否是可以直接进入下一关
				if (ui.bIntoNext) {
					this.iDelayEnterNext = delay(this.iDelayEnterNext, 30, this.enterNextStage())
				} else {
					// 键盘选择
					if (keyPressed) {
						keyPressed = false;
						switch (keyCode) {
							// 向下
							case 83: stage.num = stage.num < stage.max ? stage.num + 1 : 1; break;
							// 向上
							case 87: stage.num = stage.num > 1 ? stage.num - 1 : stage.max; break;
							// 确认
							case 72: this.enterNextStage(); break;
							default: break;
						}
					}
				}
				break;
			// 关卡界面的等待
			case 2:
				this.iStartMusicDelay = delay(this.iStartMusicDelay, 80, () => {
					cxt.misc.clearRect(35, 20, cxt.l, cxt.l);
					stage.status = 3;
				})
				break;
			// 左右两幕布拉开
			case 3:
				cxt.role.clearRect(208 - this.bgWidth, 0, 2 * this.bgWidth, cxt.l);   // 通过不断清空cxt.role上某个区域来模拟幕布拉开
				if (this.bgWidth < 208) {
					this.bgWidth += 16;
				} else {
					enemyNum();                    // 绘制右侧剩余敌军坦克数目
					myInfo();                      // 绘制己方生命数及关卡数
					ui.bInGame = true;             // 正在游戏中，可以暂停
					ui.bIntoNext = false;          // 无法直接进入下一关
					canRol.style.zIndex = '';      // 将role层放回到背景层下
					draw.obj = true;               // 循环开始绘制坦克子弹等
					draw.bullet = true;            // 循环开始绘制子弹
					draw.misc = true;              // 开始绘制杂项信息
					draw.ui = false;               // 停止绘制UI界面
				}
				break;
			default:
				break;
		}
	}

	styleChange(){
		// 改变背景颜色是为了bg层清除右边边框内容时不需要再重绘#666色的背景了，直接显示背景色就好了
		gameBox.border.style.backgroundColor = '#666';
		canRol.style.zIndex = '1';
		cxt.role.clearRect(0, 0, cxt.l, cxt.l);
		cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
		cxt.role.save();
		cxt.role.fillStyle = '#666';
		cxt.role.fillRect(0, 0, cxt.l, cxt.l);
		cxt.role.restore();
	}

	enterNextStage(){
		bPC && oAud.start.play();
		draw.map = true;                 // 循环开始绘制背景地图
		stage.status = 2;
		oEnemy.num = 1;                  // 当前画出来的是第几个坦克，因为坦克是从正中间开始刷新，因此从1开始计数
		tankInit();                      // 坦克对象初始化
	}

	// 计分的界面
	gameScore(){
		if (this.bEnterNextStage) {
			this.iDelay = delay(this.iDelay, 120, () => {
				this.bEnterNextStage = false;
				// bGameOver为真表明游戏结束，跳转到gameOver()并重新开始游戏
				if (bGameOver) {
					this.drawOverPic();
					ui.status = 4;
					this.iOverStatus = 2;
				} else {
					ui.bIntoNext = true;
					stage.num ++;
					ui.status = 1;
					stage.status = 1;
					this.styleChange();
					this.gameStageInit();
					this.startInit();
				}
			})
		} else {
			this.drawScore();
		}
	}

	// 绘制分数
	drawScore(){
		cxt.misc.save();
		cxt.misc.clearRect(0, 0, 516, 180); // 这里必须要清除屏幕，不然prstart字体不会被应用！！！！
		cxt.misc.fillStyle = '#ea9e22';
		cxt.misc.fillText(oScore.totalScore, 110, 160);
		cxt.misc.fillStyle = '#fff';
		cxt.misc.fillText("STAGE  "+ stage.num, 190, 90);
		this.iScoreDelay = delay(this.iScoreDelay, 5, () => {
			cxt.misc.clearRect(0, 180, 516, 276);
			for (let i = 0; i < this.iTankScore; i++) {
				cxt.misc.fillText(this.iScoreNum[i] * 100, 40, oScore.y[i]);
				cxt.misc.fillText(this.iScoreNum[i], 195, oScore.y[i]);
				if (i === (this.iTankScore - 1)) {
					(this.iScoreNum[i] != oScore.tankNum[i]) ? this.iScoreNum[i] ++ : this.bTankScoreAdd = true;
				}
			}
			if (this.bTankScoreAdd) {
				this.bTankScoreAdd = false;
				this.iTankScore < 4 ? this.iTankScore ++ : this.bDrawTotal = true;
			}
			if (this.bDrawTotal) {
				this.bDrawTotal = false;
				cxt.misc.fillText(oScore.totalTank, 195, 380);
				this.iTankScore = 1;
				this.iScoreNum = [0, 0, 0, 0];
				this.bEnterNextStage = true;
			}
		});
		cxt.misc.restore();
	}

	gameStop(){
		this.iTxtDelay = delay(this.iTxtDelay, 20, () => {
			this.iTxtStatus = +!this.iTxtStatus;
			if (this.iTxtStatus) {
				cxt.misc.save();
				cxt.misc.fillStyle = '#db2b00';
				cxt.misc.fillText("GAME STOP", 175, 235);
				cxt.misc.restore();
			} else {
				cxt.misc.clearRect(170, 220, 150, 20);
			}
		});
	}

	gameOver(){
		switch (this.iOverStatus) {
			// 文字上移
			case 0:
				cxt.misc.clearRect(170, this.iOverY - 15, 150, 20);
				this.iOverY -= 4;
				cxt.misc.save();
				cxt.misc.fillStyle = '#db2b00';
				cxt.misc.fillText("GAME OVER", 175, this.iOverY);
				cxt.misc.restore();
				if (this.iOverY <= 236) {
					this.iOverStatus = 1;
				}
				break;
			// 等待进入分数统计界面
			case 1:
				cxt.misc.fillStyle = '#db2b00';
				cxt.misc.clearRect(170, this.iOverY - 15, 150, 20);
				cxt.misc.fillText("GAME OVER", 175, 236);
				cxt.misc.restore();
				enterScore();
				break;
			// 准备重新开始游戏
			case 2:
				this.iDelay = delay(this.iDelay, 120, () => {
					cxt.bg.clearRect(134, 148, 248, 160);
					this.init();
					this.startInit();
					ui.status = 0;
					bGameOver = false;
					iPlayerLife = 2,                           // 重置玩家生命
					iPlayerRank = 0;                           // 重置玩家等级
					// 如果第一关地图数据有自定义过，那么重置
					(mapData[0] !== mapDataStage_1) && (mapData[0] = mapDataStage_1);
				});
				break;
			default:
				break;
		}
	}

	drawOverPic(){
		bPC && oAud.over.play();
		cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
		cxt.misc.clearRect(0, 0, cxt.w, cxt.h);
		gameBox.border.style.backgroundColor = '';
		cxt.bg.drawImage(oImg.ui, 0, 160, 248, 160, 134, 148, 248, 160);
	}
}
