let oBrickStatus = new Object();

// 顶级对象
class MoverObj {
	constructor() {
		this.x;
		this.y;
		this.bAlive = false;      //对象是否存活
		this.iType;               //用来判断当前对象到底是子弹还是坦克（0表示子弹1表示坦克）
		this.iDir;                //方向0：上，1：右，2：下，3：左
		this.iSpeed;              //速度
		this.iSpeedX;             //横坐标上的速度
		this.iSpeedY;             //纵坐标上的速度
		this.bMoveSet = true;     //对象重置后重新设置一下移动相关的函数（坦克在改变方向后也需要重新设置）
		this.bMoveAble = true;    //是否允许运动
		this.bHitBrick = false;   //当前对象是否碰到砖块

		this.collision();
	}

	// 对象移动函数
	move(){
		this.bMoveSet && this.moveSet();
		if (this.bMoveAble) {
			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
		}
		// 只有当对象的位置可以整除16或者碰到了砖块才会开始检查是否可以通行
		((!(this.x % 16) && !(this.y % 16)) || this.bHitBrick)
		&& (this.bMoveAble = this.oRoad[this.iDir]());
	}

	// 根据当前方向重置相关的坐标参数
	moveSet(){
		this.bMoveSet = false;
		this.speedSet();
		this.bMoveAble = this.oRoad[this.iDir]();      //判断当前方向是否可以通行
	}

	//根据方向重置当前速度参数
	speedSet(){
		// 1、3，右、左
		if (this.iDir % 2) {
			this.iSpeedX = (this.iDir - 1) ? -this.iSpeed : this.iSpeed;
			this.iSpeedY = 0;
		// 0、2，上、下
		} else {
			this.iSpeedY = this.iDir ? this.iSpeed : -this.iSpeed;
			this.iSpeedX = 0;
		}
	}

	//碰撞检测（只有移动对象与砖块的碰撞检测）
	collision(){
		let iRow,
			iCol,
			iAdd,
			iBorder,
			arr = [2];
		let aaa;
		this.oRoad = {
			0 : () => {
				iAdd = -1;
				[iRow , iCol] = [parseInt((this.y + iAdd) / 16) , parseInt(this.x / 16)];
				return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow][iCol + 1]) && this.y > 0;
				// if (this.iType) {
				// 	return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow][iCol + 1]) && this.y > 0;
				// } else {
				// 	return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow][iCol + 1]) && this.y > 0;
				// }
			},

			1 : () => {
				[iAdd , iBorder , aaa] = this.iType ? [0 , 384 , 2] : [8 , 408 , 0];
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt((this.x + iAdd) / 16)];
				return this.roadJudge(roadMap[iRow][iCol + aaa] , roadMap[iRow + 1][iCol + aaa]) && this.x < iBorder;
				// if (this.iType) {
				// 	return this.roadJudge(roadMap[iRow][iCol + 2] , roadMap[iRow + 1][iCol + 2]) && this.x < iBorder;
				// } else {
				// 	return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow + 1][iCol]) && this.x < iBorder;
				// }
			},

			2 : () => {
				[iAdd , iBorder , aaa] = this.iType ? [0 , 384 , 2] : [8 , 408 , 0];
				[iRow , iCol] = [parseInt((this.y + iAdd) / 16) , parseInt(this.x / 16)];
				return this.roadJudge(roadMap[iRow + aaa][iCol] , roadMap[iRow + aaa][iCol + 1]) && this.y < iBorder;
				// if (this.iType) {
				// 	return this.roadJudge(roadMap[iRow + 2][iCol] , roadMap[iRow + 2][iCol + 1]) && this.y < iBorder;
				// } else {
				// 	return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow][iCol + 1]) && this.y < iBorder;
				// }
			},

			3 : () => {
				iAdd = -1;
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt((this.x + iAdd) / 16)];
				return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow + 1][iCol]) && this.x > 0;
				// if (this.iType) {
				// 	return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow + 1][iCol]) && this.x > 0;
				// } else {
				// 	return this.roadJudge(roadMap[iRow][iCol] , roadMap[iRow + 1][iCol]) && this.x > 0;
				// }
			}
		}

		this.roadJudge = function (...values) {
			this.bHitBrick = false;
			for (let i = 0; i < 2; i++) {
				arr[i] = this.iType ? this.tankRoadJudge(values[i]) : this.bulletRoadJudge(values[i] , i);
			}
			return arr[0] && arr[1];
		}

		this.tankRoadJudge = function (num) {
			switch (num) {
				case 0: return true; break;
				// 砖块钢筋河流老家无法通过
				case 1:
				case 2:
				case 4:
				case 5: return false; break;
				// 冰路中间有相应的代码（默认就是3了）
				default: return true; break;
			}
		}

		this.bulletRoadJudge = function (num , i) {
			switch (num) {
				case 0: return true; break;
				// 砖块
				case 1:
					this.bHitBrick = true;
					return this.bulletBrickRoad(i);
					break;
				// 钢筋
				case 2:
					if (this.iRank === 3) {
						roadMap[iRow][iCol] = 0;
						cxt.bg.clearRect(35 + iCol * 16 , 20 + iRow * 16 , 16 , 16);
					}
					return false;
					break;
				// 子弹过老家那么游戏结束
				case 5:
					draw.gameover = true;
					return false;
					break;
				// 河流跟冰路直接过（默认是3和4）
				default: return true; break;
			}
		}

		let iBrickObjIndex;                 //如果子弹碰到砖块了，那么就将当前砖块的行列计算成oBrickStatus对象的属性名，用来读取对应砖块的属性
		/**
		 * 一个16*16的砖块格子，可以分成如下的4个8*8的小格子：
		 * |  8*8  |  8*8  |
 		 * -----------------
 		 * |  8*8  |  8*8  |
		 * 这是因为如果坦克子弹不是最高等级，那么一次最多只能打掉两个8*8的格子
		 * 如果将每个砖块视为一个含有四个数组项的数组，如果数组项为1，表示对应的8*8的格子没有被打掉
		 * @param  同上
		 * @return 同上
		 */
		this.bulletBrickRoad = function (i) {
			iBrickObjIndex = iRow * 16 + iCol;
			if (oBrickStatus[iBrickObjIndex]) {
				return this.bulletHitBrick(i);
			} else{
				oBrickStatus[iBrickObjIndex] = [1 , 1 , 1 , 1];
				return this.bulletHitBrick(i);
			}
		}

		let brickLayer;      //根据子弹的位置计算当前砖块还有几层（一般有两层）
		/**
		 * 子弹击中砖块后相应的处理函数
		 * @param  同上
		 * @return 同上
		 */
		this.bulletHitBrick = function (i) {
			// 子弹方向为左右
			if (this.iDir % 2) {
				// this.iDir%3*8是因为方向不同，子弹的x值并不是一直处于子弹当前前进方向的最面的，下面的y同理
				brickLayer = parseInt( ((this.x+this.iDir%3*8) - iCol * 16) / 8 );
				if (oBrickStatus[iBrickObjIndex][brickLayer + (1 - i) * 2]) {
					oBrickStatus[iBrickObjIndex][brickLayer] = 0;
					oBrickStatus[iBrickObjIndex][brickLayer + 2] = 0;
					cxt.bg.clearRect(35 + brickLayer * 8 + iCol * 16 , 20 + iRow * 16 , 8 , 16);
					clearBrick(iRow , iCol);
					return false;
				}
				return true;
			// 子弹方向为上下
			} else {
				brickLayer = parseInt( ((this.y+this.iDir/2*8) - iRow * 16) / 8 );
				if (oBrickStatus[iBrickObjIndex][brickLayer * 2 + 1 - i]) {
					oBrickStatus[iBrickObjIndex][brickLayer * 2] = 0;
					oBrickStatus[iBrickObjIndex][brickLayer * 2 + 1] = 0;
					cxt.bg.clearRect(35 + iCol * 16 , 20 + brickLayer * 8 + iRow * 16 , 16 , 8);
					clearBrick(iRow , iCol);
					return false;
				}
				return true;
			}
		}

		/**
		 * 当一个16*16的格子里的装块全部被打掉后，清除相关对象，并将相应的roadMap数组项置0
		 * @param  同上
		 */
		function clearBrick() {
			if( !(oBrickStatus[iBrickObjIndex][0]
				|| oBrickStatus[iBrickObjIndex][1]
				|| oBrickStatus[iBrickObjIndex][2]
				|| oBrickStatus[iBrickObjIndex][3]) ) {
				oBrickStatus[iBrickObjIndex] = null;
				roadMap[iRow][iCol] = 0;
				cxt.bg.clearRect(35 + iCol * 16 , 20 + iRow * 16 , 16 , 16);
			}
		}
	}
}
