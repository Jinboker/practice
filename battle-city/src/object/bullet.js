/**
 * 绘制子弹
 */
function drawBullet() {
	let len = aBullet.length;
	for (let i = 0; i < len; i++) {
		aBullet[i].bAlive && aBullet[i].draw();
	}
}

// 子弹对象，继承自顶级对象mover
class BulletObj extends MoverObj {
	constructor(i) {
		super();

		this.iIndex = i;         // 子弹索引，用来确定是哪个坦克发射出来的子弹
		this.oImg                // 子弹图片，已缓存
		this.iRank;              // 子弹的等级，为3时一枚子弹打掉16*16的砖块且能够击穿钢筋
		this.iBulletType;        // 子弹的类型（0是玩家，1是NPC）

		this.barrierCollision();
	}

	init(...values){
		[this.x, this.y, this.iDir, this.iBulletType, this.iRank = 0] = values;
		this.bAlive = true;
		this.iSpeed = this.iRank ? 5 : 4;    // 如果坦克的iRank是0，那么子弹一次移动4像素，如果不是0，一次移动5像素

		// 1、3
		if (this.iDir%2) {
			this.y += 12;
			this.x += 24*(+!(this.iDir-1));
		// 0, 2
		} else {
			this.x += 12;
			this.y += 24*this.iDir/2;
		}
		this.speedSet();
	}

	draw(){
		if (this.oHitBarrier[this.iDir]() && this.tankCollision() && this.bulletCollision()) {
			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
			cxt.role.drawImage(oImg.misc, this.iDir * 8, 0, 8, 8, this.x, this.y, 8, 8);
		} else {
			this.bAlive = false;
		}
	}

	// 子弹与障碍物之间的碰撞检测
	barrierCollision(){
		let iRow, iCol, arr = [2], bHitBarrier, that = this;

		this.oHitBarrier = {
			0: () => {
				[iRow, iCol] = [parseInt(this.y / 16), parseInt(this.x / 16)];
				return this.boomInit((hit(iRow, iCol, iRow, iCol + 1) && this.y > 0));
			},

			1: () => {
				[iRow, iCol] = [parseInt(this.y / 16), parseInt((this.x + 8) / 16)];
				return this.boomInit((hit(iRow, iCol, iRow + 1, iCol) && this.x < 408));
			},

			2: () => {
				[iRow, iCol] = [parseInt((this.y + 8) / 16), parseInt(this.x / 16)];
				return this.boomInit((hit(iRow, iCol, iRow, iCol + 1) && this.y < 408));
			},

			3: () => {
				[iRow, iCol] = [parseInt(this.y / 16), parseInt(this.x / 16)];
				return this.boomInit((hit(iRow, iCol, iRow + 1, iCol) && this.x > 0));
			}
		}

		let iRowVal, iColVal;

		function hit(...values) {
			for (let i = 0; i < 2; i++) {
				iRowVal = values[2*i];
				iColVal = values[2*i+1];
				arr[i] = barrierVal(roadMap[iRowVal][iColVal], iRowVal, iColVal, i)
			}
			return arr[0] && arr[1];
		}

		let num, row, col, j;

		function barrierVal(...values) {
			[num, row, col, j] = values;
			switch (num) {
			  // 如果是0，直接通过
			  case 0: return true; break;
			  // 砖块
			  case 1:
				   return bulletBrickRoad();
				   break;
			  // 钢筋
			  case 2:
				  if (!that.iBulletType) {
					  (oPlayer.iRank === 3) && clearBigBarrier();
					  bPC && oAud.attOver.play();
				  }
				  return false;
				  break;
			  // 子弹过老家那么游戏结束
			  case 5:
				  that.gameOver();
				  oPlayer.bMoveAble = false;       // 玩家无法移动
				  cxt.bg.clearRect(227, 404, 32, 32);
				  cxt.bg.drawImage(oImg.brick, 512, 0, 32, 32, 227, 404, 32, 32);
				  return false;
				  break;
			  // 河流跟冰路直接过（默认是3和4）
			  default: return true; break;
			}
		}

		function clearBigBarrier(num) {
			roadMap[row][col] = 0;
			cxt.bg.clearRect(35 + col * 16, 20 + row * 16, 16, 16);
		}

		let iBrickObjIndex;                 // 如果子弹碰到砖块了，那么就将当前砖块的行列计算成oBrickStatus对象的属性名，用来读取对应砖块的属性
		/**
		* 一个16*16的砖块格子，可以分成如下的4个8*8的小格子：
		* |  8*8  |  8*8  |
		* -----------------
		* |  8*8  |  8*8  |
		* 这是因为如果坦克子弹不是最高等级，那么一次最多只能打掉两个8*8的格子
		* 如果将每个砖块视为一个含有四个数组项的数组，如果数组项为1，表示对应的8*8的格子没有被打掉
		*/
		function bulletBrickRoad() {
			iBrickObjIndex = row * 28 + col;
			if (!!oBrickStatus[iBrickObjIndex]) {
				return hitBrick();
			} else{
				oBrickStatus[iBrickObjIndex] = [1, 1, 1, 1];
				return hitBrick();
			}
		}

		let iBrickLayer;      // 根据子弹的位置计算当前砖块还有几层（一般有两层）
		/**
		* 子弹击中砖块后相应的处理函数
		*/
		function hitBrick() {
			// 子弹方向为左右
			if (that.iDir % 2) {
				 // that.iDir%3*8是因为方向不同，子弹的x值并不是一直处于子弹当前前进方向的最面的
				 // 因此要根据方向决定是否在x轴坐标上加上8个像素，下面的y同理
				 iBrickLayer = parseInt( ((that.x+that.iDir%3*8) - col * 16) / 8 );
				 if (oBrickStatus[iBrickObjIndex][iBrickLayer + (1 - j) * 2]) {
					 oBrickStatus[iBrickObjIndex][iBrickLayer] = 0;
					 oBrickStatus[iBrickObjIndex][iBrickLayer + 2] = 0;
					 // 如果玩家子弹的等级大于等于2，那么一次直接清除16*16的砖块，否则就是按照最小8*8的来清除
					 if ( (oPlayer.iRank >= 2) && !that.iBulletType ) {
						 clearBigBarrier();
					 } else {
						 cxt.bg.clearRect(35 + iBrickLayer * 8 + col * 16, 20 + row * 16, 8, 16);
						 clearBrick();
					 }
					 return false;
				}
			// 子弹方向为上下
			} else {
				iBrickLayer = parseInt( ((that.y+that.iDir/2*8) - row * 16) / 8 );
				if (oBrickStatus[iBrickObjIndex][iBrickLayer * 2 + 1 - j]) {
					oBrickStatus[iBrickObjIndex][iBrickLayer * 2] = 0;
					oBrickStatus[iBrickObjIndex][iBrickLayer * 2 + 1] = 0;
					if ( (oPlayer.iRank >= 2) && !that.iBulletType ) {
						clearBigBarrier();
					} else {
						cxt.bg.clearRect(35 + col * 16, 20 + iBrickLayer * 8 + row * 16, 16, 8);
						clearBrick();
					}
					return false;
				}
			}
			return true;
		}

		/**
		* 当一个16*16的格子里的装块全部被打掉后，清除相关对象，并将相应的roadMap数组项置0
		*/
		function clearBrick() {
			for (let i = 0; i < 4; i++) {
				if (oBrickStatus[iBrickObjIndex][i]) { return; }
				if (i === 3) {
					oBrickStatus[iBrickObjIndex] = null;
					roadMap[row][col] = 0;
					cxt.bg.clearRect(35 + col * 16, 20 + row * 16, 16, 16);
				}
			}
		}

		/**
		 * 如果子弹撞到了障碍物或者墙壁那么就要开始初始化爆炸效果
		 * @param  {[boolean]} bHitBarrier [子弹是否撞到了墙壁或者障碍物]
		 * @return {[boolean]}             [返回子弹是否撞到了墙壁或者障碍物的布尔值]
		 */
		this.boomInit = function (bHitBarrier) {
			if (!bHitBarrier) { aSmallExplode.push(new SmallExplode(this.x, this.y, this.iDir)); }
			return bHitBarrier;
		}
	}

	gameOver(){
		iDelayEnterScore = 100;          // 100个循环后进入分数统计页面
		ui.status = 4;                   // 游戏结束界面
		draw.ui = true;                  // 绘制UI
		bGameOver = true;                // 游戏结束
	}

	// 子弹与坦克之间的碰撞检测
	tankCollision(){
		// 根据NPC的子弹检测玩家坦克，玩家子弹检测NPC坦克
		return this.iBulletType ? this.NPCCollision() : this.playerCollision();
	}

	// NPC的子弹与玩家的碰撞
	NPCCollision(){
		// 如果玩家已经没有生命那么就不必进行检查了
		if ((oPlayer.iLife >= 0) && this.tankCollisionCondition(oPlayer)) {
			// 如果玩家没有防护罩，那么扣掉生命值重新刷新坦克
			if (!oPlayer.bShield) {
				// 如果玩家坦克等级是最高级，那么被子弹打一下不会死
				if (oPlayer.iRank === 3) {
					oPlayer.iRank --;
					this.hitTankSmallBoom(oPlayer);
				} else {
					oPlayer.iLife --;
					oPlayer.iRank = 0;                   // 坦克等级降至最低
					oPlayer.iLife >= 0 ? myInfo() : this.gameOver();
					this.hitTankBigBoom(oPlayer);
				}
			}
			return false;
		}
		return true;
	}

	// 玩家发射的子弹与NPC之间的碰撞
	playerCollision(){
		for (let i = 1; i < 5; i++) {
			let oTank = aTankArr[i];
			if (this.iIndex === i) { continue; }
			if (this.tankCollisionCondition(oTank)) {
				if ((oTank.iType % 2) || (oTank.iType === 8)) {
					if ((oTank.iType !== 7) && (oTank.iType !== 8)) {
						// 如果奖励对象已经存在，那么先清掉相关区域的图像
						oBonus && cxt.misc.clearRect(35 + oBonus.x, 20 + oBonus.y, 32, 32);
						// 新建奖励对象
						oBonus = new Bonus();
						oBonus.init(stage.num - 1);
					}
					this.hitTankSmallBoom(oTank);
				} else {
					this.getScore(oTank.iType);
					this.hitTankBigBoom(oTank);
				}
				return false;
			}
		}
		return true;
	}

	/**
	 * 子弹与坦克碰撞判断
	 * @param  {[object]}   oTank   [当前检查的坦克对象]
	 * @return {[boolean]}          [为真就是子弹与坦克有了碰撞]
	 */
	tankCollisionCondition(oTank){
		if (!oTank.bBorned) { return false; }
		let x = this.x - oTank.x;
		let y = this.y - oTank.y;
		if (this.iDir % 2) {
			return (this.iDir -1)
			? (x < 32 && x > 0 && y > -8 && y < 32)
			: (x > -8 && x < 0 && y > -8 && y < 32);
		} else {
			return this.iDir
			? (y > -8 && y < 0 && x > -8 && x < 32)
			: (y < 32 && y > 0 && x > -8 && x < 32);
		}
	}

	// 坦克被子弹击中的小爆炸
	hitTankSmallBoom(obj){
		aSmallExplode.push(new SmallExplode(obj.x + 16, obj.y + 16, obj.iDir));
		bPC && oAud.attOver.play();
		obj.iType --;
	}

	// 坦克被子弹击中的大爆炸
	hitTankBigBoom(obj){
		bPC && oAud.explode.play();
		aBigExplode.push(new BigExplode(obj.x + 16, obj.y + 16, obj.iDir));
		obj.bAlive = false;              // 坦克死亡
		obj.bBorned = false;             // 坦克未出生
	}

	// 统计被子弹击杀的坦克类型，用来在结束后统计分数
	getScore(num){
		switch (parseInt(num / 2)) {
			case 0: oScore.tankNum[0] ++; break;
			case 1: oScore.tankNum[1] ++; break;
			case 2: oScore.tankNum[2] ++; break;
			case 3:
			case 4: oScore.tankNum[3] ++; break;
			default: break;
		}
	}

	// 子弹与子弹的碰撞
	bulletCollision(){
		// 如果子弹是NPC的子弹或者玩家子弹不存在，则不必检测子弹的碰撞
		if (!!this.iBulletType || !aTankArr[0].oBullet.bAlive) { return true; }

		for (let i = 1; i < 5; i++) {
			// 如果子弹不存在，不进行检测
			if (!aTankArr[i].oBullet.bAlive) { continue; }

			let oTank = aTankArr[i],
				xVal = Math.abs(this.x - oTank.oBullet.x),
				yVal = Math.abs(this.y - oTank.oBullet.y);

			// 如果玩家子弹与NPC子弹之间的横纵坐标之差的绝对值都小于等于8，那么表明两发子弹碰到一起了
			if (xVal <= 8 && yVal <= 8) {
				oTank.oBullet.bAlive = false;
				return false;
			}
		}
		return true;
	}
}
