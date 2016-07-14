// 提前定义四个子弹的canvas，省掉画图时剪切的时间
let m_canT = document.createElement('canvas'),
	m_canR = document.createElement('canvas'),
	m_canD = document.createElement('canvas'),
	m_canL = document.createElement('canvas');

m_canT.width = m_canT.height =
m_canR.width = m_canR.height =
m_canD.width = m_canD.height =
m_canL.width = m_canL.height = 8;

m_canT.getContext('2d').drawImage(oImg.misc , 0 , 0 , 8 , 8 , 0 , 0 , 8 , 8);
m_canR.getContext('2d').drawImage(oImg.misc , 8 , 0 , 8 , 8 , 0 , 0 , 8 , 8);
m_canD.getContext('2d').drawImage(oImg.misc , 16 , 0 , 8 , 8 , 0 , 0 , 8 , 8);
m_canL.getContext('2d').drawImage(oImg.misc , 24 , 0 , 8 , 8 , 0 , 0 , 8 , 8);

let oBrickStatus = new Object();

// 子弹对象，继承自顶级对象mover
class BulletObj extends MoverObj {
	constructor() {
		super();

		this.oImg                //子弹图片，已缓存
		this.iType = 0;          //当前运动对象为子弹
		this.iRank = 0;          //子弹的等级，为3时一枚子弹打掉16*16的砖块且能够击穿钢筋

		this.collision();
	}

	init(x , y , dir , rank = 0){
		this.iSpeed = rank ? 5 : 4;    //如果坦克的iRank是0，那么子弹一次移动4像素，如果不是0，一次移动5像素
		this.bAlive = true;
		this.x = x;
		this.y = y;
		this.iRank = rank;
		this.iDir = dir;

		// 1、3
		if (dir%2) {
			this.y += 12;
			this.x += 24*(+!(dir-1));
			this.oImg = (dir - 1) ? m_canL : m_canR;
		// 0 , 2
		} else {
			this.x += 12;
			this.y += 24*dir/2;
			this.oImg = (dir/2) ? m_canD : m_canT;
		}
		this.speedSet();
	}

	draw(){
		if (this.oPass[this.iDir]()) {
			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
			cxt.role.drawImage(this.oImg , this.x , this.y , 8 , 8);
		} else {
			this.bMoveSet = true;
			this.bAlive = false;
		}
	}

	/**
	 * 覆盖-----碰撞检测
	 */
	collision(){
		let iRow,
			iCol,
			arr = [2];

			this.oPass = {
				0 : () => {
					[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
					return this.hitBarrier(iRow , iCol , iRow , iCol + 1) && this.y > 0;
				},

				1 : () => {
					[iRow , iCol] = [parseInt(this.y / 16) , parseInt((this.x + 8) / 16)];
					return this.hitBarrier(iRow , iCol , iRow + 1 , iCol) && this.x < 408;
				},

				2 : () => {
					[iRow , iCol] = [parseInt((this.y + 8) / 16) , parseInt(this.x / 16)];
					return this.hitBarrier(iRow , iCol , iRow , iCol + 1) && this.y < 408;
				},

				3 : () => {
					[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
					return this.hitBarrier(iRow , iCol , iRow + 1 , iCol) && this.x > 0;
				}
			}

		let iRowVal,
			iColVal;
		
		this.hitBarrier = function (...values) {
			for (let i = 0; i < 2; i++) {
				iRowVal = values[2*i];
				iColVal = values[2*i+1];
				arr[i] = this.barrierVal(roadMap[iRowVal][iColVal] , iRowVal , iColVal , i)
			}
			return arr[0] && arr[1];
		}

		let num,
			row,
			col,
			j;

	   this.barrierVal = function (...values) {
		   [num , row , col , j] = values;
		   switch (num) {
			   // 如果是0，直接通过
			   case 0: return true; break;
			   // 砖块
			   case 1:
					return this.bulletBrickRoad();
					break;
			   // 钢筋
			   case 2:
				   if (this.iType === 3) {
					   roadMap[row][col] = 0;
					   cxt.bg.clearRect(35 + col * 16 , 20 + row * 16 , 16 , 16);
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
		this.bulletBrickRoad = function () {
		   iBrickObjIndex = row * 16 + col;
		   if (oBrickStatus[iBrickObjIndex]) {
			return this.hitBrick();
		   } else{
			   oBrickStatus[iBrickObjIndex] = [1 , 1 , 1 , 1];
			return this.hitBrick();
		   }
	   }

	   let iBrickLayer;      //根据子弹的位置计算当前砖块还有几层（一般有两层）
	   /**
		* 子弹击中砖块后相应的处理函数
		* @param  同上
		* @return 同上
		*/
		this.hitBrick = function () {
		   // 子弹方向为左右
		   if (this.iDir % 2) {
			   // this.iDir%3*8是因为方向不同，子弹的x值并不是一直处于子弹当前前进方向的最面的
			   // 因此要根据方向决定是否在x轴坐标上加上8个像素，下面的y同理
			   iBrickLayer = parseInt( ((this.x+this.iDir%3*8) - col * 16) / 8 );
			   if (oBrickStatus[iBrickObjIndex][iBrickLayer + (1 - j) * 2]) {
				   oBrickStatus[iBrickObjIndex][iBrickLayer] = 0;
				   oBrickStatus[iBrickObjIndex][iBrickLayer + 2] = 0;
				   cxt.bg.clearRect(35 + iBrickLayer * 8 + col * 16 , 20 + row * 16 , 8 , 16);
				   clearBrick(row , col);
				   return false;
			   }
			   return true;
		   // 子弹方向为上下
		   } else {
			   iBrickLayer = parseInt( ((this.y+this.iDir/2*8) - row * 16) / 8 );
			   if (oBrickStatus[iBrickObjIndex][iBrickLayer * 2 + 1 - j]) {
				   oBrickStatus[iBrickObjIndex][iBrickLayer * 2] = 0;
				   oBrickStatus[iBrickObjIndex][iBrickLayer * 2 + 1] = 0;
				   cxt.bg.clearRect(35 + col * 16 , 20 + iBrickLayer * 8 + row * 16 , 16 , 8);
				   clearBrick(row , col);
				   return false;
			   }
			   return true;
		   }
	   }

	   /**
		* 当一个16*16的格子里的装块全部被打掉后，清除相关对象，并将相应的roadMap数组项置0
		* @param  同上
		*/
	   function clearBrick(row , col) {
		   if( !(oBrickStatus[iBrickObjIndex][0]
			   || oBrickStatus[iBrickObjIndex][1]
			   || oBrickStatus[iBrickObjIndex][2]
			   || oBrickStatus[iBrickObjIndex][3]) ) {
			   oBrickStatus[iBrickObjIndex] = null;
			   roadMap[row][col] = 0;
			   cxt.bg.clearRect(35 + col * 16 , 20 + row * 16 , 16 , 16);
		   }
	   }
	}
}
