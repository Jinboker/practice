const iEnemyNum = 5;            //同时存在的最大坦克数（包括玩家及NPC）
let aTankArr = [],
	bGameOver = false,          //游戏结束
	oPlayer;                    //用来表示玩家

/**
 * 创建坦克对象的实例
 */
function tankInit() {
	// 第一个是玩家坦克，后面四个是敌军坦克
	oPlayer = aTankArr[0] = new PlayerObj(iPlayerLife, iPlayerRank);
	for (let i = 1; i < iEnemyNum; i++) {
		aTankArr[i] = new EnemyObj(i);
	}
}

let bHasTankDie = true,          //是否有坦克不是处于活着的状态
	bAllTankDie = false,         //所有的坦克是否都被干掉
	iDelayEnterScore = 180;      //消灭所有的坦克后延迟180个循环后进入分数统计界面

/**
 * 绘制坦克
 */
function drawTank() {
	cxt.role.clearRect(0 , 0 , cxt.l , cxt.l);

	// 渲染玩家坦克
	drawPlayer();

	// 渲染NPC坦克
	drawNPC();

	// 如果存在被干掉的坦克，那么需要用oEnemy.iBornDelay进行延迟坦克的出生
	if (bHasTankDie) { oEnemy.iBornDelay --; bHasTankDie = false; }

	// 渲染爆炸
	explode();

	// 如果全部的NPC都被干掉了，那么延迟180个循环后开始统计数据并进入下一关
	bAllTankDie && enterScore();
}

function drawPlayer() {
	if (oPlayer.bAlive) {
		oPlayer.draw();
		// 如果敌军坦克数目已经到了最大，只要所有的坦克都被干掉了bAllTankDie无法为假，直接进入计分界面
		(oEnemy.num > oEnemy.maxNum) && (bAllTankDie = true);
	} else {
		(oPlayer.iLife >= 0) && oPlayer.init();
	}
}

function drawNPC() {
	let oTank;
	for (let i = 1; i < iEnemyNum; i++) {
		oTank = aTankArr[i];
		if (oTank.bAlive) {
			oTank.draw();
			bAllTankDie = false;
		} else {
			bHasTankDie = true;
			if (oEnemy.iBornDelay || (oEnemy.num > oEnemy.maxNum)) { continue; }
			oTank.init();
		}
	}
}

function enterScore() {
	iDelayEnterScore = delay(iDelayEnterScore , 180 , () => {
		bAllTankDie = false;
		oBrickStatus = new Object();                         //重置砖块状态
		iPlayerLife = oPlayer.iLife;                         //更新玩家生命
		iPlayerRank = oPlayer.iRank;                         //更新玩家等级
		aTankArr = [];                                       //清空坦克数组
		aBullet = [];                                        //清空子弹数组
		oBonus = null;                                       //清空奖励对象
		iTimerDelay = 0;                                     //重置定时器时间
		oHome.bChange = false;                               //老家障碍不再绘制
		draw.obj = false;
		draw.ui = true;
		ui.bInGame = false;                                  //不在游戏中
		ui.status = 2;                                       //进入计分页面
		oClass.ui.gameScoreInit();                           //初始化计分页面的相关变量
		cxt.misc.clearRect(0 , 0 , cxt.w , cxt.h);
		cxt.bg.clearRect(0 , 0 , cxt.w , cxt.h);
		cxt.role.clearRect(0 , 0 , cxt.l , cxt.l);
		cxt.bg.drawImage(oImg.score , 0 , 0 , 516 , 456);
		oScore.totalScore = oScore.tankNum[0] * 100 + oScore.tankNum[1] * 200 + oScore.tankNum[2] * 300 + oScore.tankNum[3] * 400 +  iEatBouns * 500;
		oScore.totalTank = oScore.tankNum[0] + oScore.tankNum[1] + oScore.tankNum[2] + oScore.tankNum[3];
	});
}



/**
 * 坦克对象，继承自MoverObj
 */
class TankObj extends MoverObj {
	constructor() {
		super();

		this.iIndex;                       //当前坦克在aTankArr中的索引值
		this.bAlive = false;               //坦克一开始都是未出生

		//渲染出生时候的动画
		this.bBorned;                      //坦克角色是否已经出生
		this.iBornAniNum = 0;              //出生的动画循环的次数
		this.iBornPic = 0;                 //当前出生的动画所显示的图片
		this.iBornDelay = 3;               //三个循环的延迟改变一次出生的图片

		// 坦克轮胎改变相关
		this.iWheelPic = 0;
		this.iWheelDelay = 5;

		// 碰撞相关
		this.bHitBarrier = false;          //是否碰到了障碍物
		this.bHitTank = false;             //是否碰到了坦克

		// 子弹相关
		this.iBulletDelay;                //子弹小时候需要延迟iBulletDelay个循环才能再次发射

		this.barrierCollision();
	}

	bornInit(){
		this.bAlive = true;
		this.bBorned = false;
	}

	born(){
		// 动画播放4次
		if (this.iBornAniNum < 4) {
			this.bornDelay = delay(this.bornDelay , 3 , () => {
				// 一个完整的动画由四张图组成
				if (this.iBornPic < 4) {
					this.iBornPic ++;
				} else {
					this.iBornPic = 0;
					this.iBornAniNum ++;
					cxt.misc.clearRect(this.x + 35 , this.y + 20 , 32 , 32);
				}
				cxt.misc.drawImage(oImg.bonus , 96 - 32 * this.iBornPic , 64 , 32 , 32 , this.x + 35 , this.y + 20 , 32 , 32);
			});
		} else {
			cxt.misc.clearRect(this.x + 35 , this.y + 20 , 32 , 32);
			this.iBornAniNum = 0;
			this.bBorned = true;              //出生的动画执行完毕，开始绘制坦克
		}
	}

	// 对象移动函数
	move(){
		// 改变轮胎
		this.iWheelDelay = delay(this.iWheelDelay , 5 , () => {
			this.iWheelPic = +!this.iWheelPic;
		});
		// 只有当对象的位置可以整除16才会开始检查是否碰到砖块
		!(this.x % 16) && !(this.y % 16) && (this.bHitBarrier = this.oHitBarrier[this.iDir]());
		//检查是否碰到其他的坦克
		this.bHitTank = this.tankCollision();
		// 移动坦克的坐标
		if (this.bHitBarrier && this.bHitTank) {
			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
		}
	}

	moveSet(){
		// 在坦克转换方向后重新定位坦克的位置，使坦克当前移动方向的左边正好能够整除16，这样就正好对齐了砖块的契合处
		this.iDir % 2 ? this.y = Math.round(this.y / 16) * 16 : this.x = Math.round(this.x / 16) * 16;
		this.speedSet();
	}

	//坦克与障碍物之间的碰撞检测
	barrierCollision(){
		let iRow, iCol, arr = [2];

		this.oHitBarrier = {
			0 : () => {
				[iRow , iCol] = [parseInt((this.y - 1) / 16) , parseInt(this.x / 16)];
				return hit(iRow , iCol , iRow , iCol + 1) && this.y > 0;
			},

			1 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
				return hit(iRow , iCol + 2 , iRow + 1 , iCol + 2) && this.x < 384;
			},

			2 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
				return hit(iRow + 2 , iCol , iRow + 2 , iCol + 1) && this.y < 384;
			},

			3 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt((this.x - 1) / 16)];
				return hit(iRow , iCol , iRow + 1 , iCol) && this.x > 0;
			}
		}

		let iRowVal, iColVal;

		function hit(...values) {
			for (let i = 0; i < 2; i++) {
				iRowVal = values[2*i];
				iColVal = values[2*i+1];
				arr[i] = barrierVal(roadMap[iRowVal][iColVal]);
			}
			return arr[0] && arr[1];
		}

		function barrierVal(num) {
			switch (num) {
				case 0: return true; break;
				// 砖块钢筋河流老家无法通过
				case 1: case 2: case 4: case 5: return false; break;
				// 冰路中间有相应的代码（默认就是3了）
				default: return true; break;
			}
		}
	}

	// 坦克与坦克之间的碰撞检测
	tankCollision(){
		let xVal, yVal, bHitTankTest;

		for (let i = 0; i < 5; i++) {
			if ((this.iIndex === i) || !aTankArr[i].bBorned) { continue; }
			xVal = this.x - aTankArr[i].x;
			yVal = this.y - aTankArr[i].y;
			if (this.iDir % 2) {
				bHitTankTest = (this.iDir -1)
				? (xVal < 32 && xVal > 26 && Math.abs(yVal) < 32)
				: (xVal > -32 && xVal < -26 && Math.abs(yVal) < 32);
			} else {
				bHitTankTest = this.iDir
				? (yVal > -32 && yVal < -26 && Math.abs(xVal) < 32)
				: (yVal < 32 && yVal > 26 && Math.abs(xVal) < 32);
			}
			if (bHitTankTest) { return false; }
		}
		return true;
	}
}
