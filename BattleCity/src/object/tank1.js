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

let oBrickStatus = new Object();    //每当子弹碰到砖块后就将当前砖块的状态存如该数组，在每次关卡结束后该对象要重置

// 坦克的父类
class TankObj {
	constructor(){
		this.x;
		this.y;
		this.iType;         //坦克的状态，主要是看吃了几颗星星，最高三级，能打钢筋
		this.iWheelDelay = 5;     //坦克轮胎隔5个循环改变一次
		this.wheel = 0;

		this.dir;
		this.dirChange = true;   //坦克是否有改变方向
		this.tankMoveAble;    //坦克是否能够运动（主要是做砖块的检测）

		//渲染出生时候的动画
		this.borned = false;              //坦克角色是否已经出生
		this.bornNumCont = false;         //是否允许this.bornNum开始累加计数
		this.bornChange = 0;
		this.bornNum = 0;                 //出生的动画循环的次数
		this.bornDelay = 3;               //三个循环的延迟改变一次出生的图片

		this.shot;
		this.bAttOverAud;      //播放子弹攻击结束的音乐
		this.bulletStatus = true;   //子弹状态，只有当this.bulletStatus及this.fire都为真时才会发射子弹
		this.bullet_x;
		this.bullet_y;
		this.shotImg;
		this.xMove;
		this.yMove;
		this.iTankSpeed;        //坦克移动速度
		this.iBullet_dir;           //子弹的方向

		this.collision();
	}

	delay(num , delayNum , fn){
		if (!num) {
			num = delayNum;
			fn();
		} else {
			num --;
		}
		return num;
	}

	// 坦克出生的动画
	born(){
		// 动画循环执行4次
		if (this.bornNum < 4) {
			if (this.bornNumCont) {
				this.bornNum ++;
				this.bornNumCont = false;   //不允许this.bornNum开始累加
											//直到完整的执行玩一次bornLoop里的全部的技术累加循环后这个值才会为真
			}
			//每隔3次循环更新一下出生的动画，因为出生的动画是由四个图片组成，因此this.bornChange要循环四次
			this.bornDelay > 0 && this.bornDelay --;
			if (!this.bornDelay) {
				this.bornDelay = 3;
				if (this.bornChange < 4) {
					this.bornChange ++;
				} else {
					this.bornChange = 0;
					this.bornNumCont = true;      //出生的动画已经执行完一次，动画执行次数可以开始累加
					cxt.bg.clearRect(163 , 404 , 32 , 32);
				}
				cxt.bg.drawImage(oImg.bonus , 96 - 32 * this.bornChange , 64 , 32 , 32 , 163 , 404 , 32 , 32);
			}
		} else {
			cxt.bg.clearRect(163 , 404 , 32 , 32);
			this.bornNum = 0;
			this.borned = true;              //出生的动画执行完毕，开始绘制坦克
		}
	}

	tankPosi(){
		//坦克轮子的改变
		this.iWheelDelay = this.delay(this.iWheelDelay , 5 , () => {
			this.wheel = +!this.wheel;
		});

		// 坦克变换方向（相邻的方向，不是相对的方向）后相关的准备工作，包括使坦克与砖块契合处对齐和检测当前方向是否可以通行
		this.dirChange && this.positionSet(this.dir);

		// 因为方向是由0、1、2、3（上、右、下、左）来表示的，所以通过this.dir % 2就能判断具体是上下还是左右
		if (this.dir % 2) {
			// 因为this.dir % 2为真，那么this.dir正好为1或3（右、左），减1后判断是否为真就能确定是左还是右了
			// 如果tankMoveAble为真则代表可以通行，那么运动坦克
			(this.dir - 1) ? ( this.tankMoveAble && (this.x -= this.iTankSpeed) ) : ( this.tankMoveAble && (this.x += this.iTankSpeed) );
			// 如果坦克正好运动到路径数组节点处，那么检测下一个路径是否允许通过
			!(this.x % 16) && ( this.tankMoveAble = this.tankRoad[this.dir]());
		} else {
			this.dir ? ( this.tankMoveAble && (this.y += this.iTankSpeed) ) : ( this.tankMoveAble && (this.y -= this.iTankSpeed) );
			!(this.y % 16) && ( this.tankMoveAble = this.tankRoad[this.dir]());
		}
	}

	/**
	 * 每次坦克改变方向后的相应的设置及检测工作
	 * @param  {number} iDir [方向，this.dir]
	 */
	positionSet(iDir){
		this.dirChange = false;
		if (iDir % 2) {
			// 左右方向的设置
			let iPosiY = this.y % 16;
			this.y = iPosiY <= 6 ? this.y - iPosiY : this.y - iPosiY + 16;
		} else {
			// 上下方向的设置
			let iPosiX = this.x % 16;
			this.x = iPosiX <= 6 ? this.x - iPosiX : this.x - iPosiX + 16;
		}
		this.tankMoveAble = this.tankRoad[iDir]();
	}

	// 子弹
	bullet(){
		if (this.bulletStatus) {
			this.bulletStatus = false;
			this.bullet_x = this.x;
			this.bullet_y = this.y;
			this.iBullet_dir = this.dir;

			// this.bullet_x及this.bullet_y代表了子弹的位置，因为子弹绘制的地点与this.x和this.y不同，因此需要根据方向改变位置
			switch (this.iBullet_dir) {
				case 0:
					this.bullet_x += 12;
					this.moveX = 0;
					this.moveY = -4;
					this.shotImg = m_canT;
					break;
				case 1:
					this.bullet_x += 24;
					this.bullet_y += 12;
					this.moveX = 4;
					this.moveY = 0;
					this.shotImg = m_canR;
					break;
				case 2:
					this.bullet_x += 12;
					this.bullet_y += 24;
					this.moveX = 0;
					this.moveY = 4;
					this.shotImg = m_canD;
					break;
				default:
					this.bullet_y += 12;
					this.moveX = -4;
					this.moveY = 0;
					this.shotImg = m_canL;
					break;
			}
		}
		if ( this.bulletRoad[this.iBullet_dir]() ){
			this.bullet_x += this.moveX;
			this.bullet_y += this.moveY;
			cxt.role.drawImage(this.shotImg , this.bullet_x , this.bullet_y , 8 , 8);
		} else {
			// oAud.attOver.play();
			this.shot = false;
			this.bulletStatus = true;
		}
	}

	// 只包括坦克及子弹与地图地形之间的碰撞检测，坦克与坦克，坦克与子弹之间的碰撞检测这里不涉及
	collision(){
		/**
		 * [pass description]
		 * @param  {[type]} roadMapNum1 [description]
		 * @param  {[type]} roadMapNum2 [description]
		 * @param  {[type]} num         0表示坦克，1表示子弹
		 * @return {[type]}             [description]
		 */
		function pass(roadMapNum1 , roadMapNum2 , num) {
			// 检查是否与砖块相互碰撞
			let arr = [2];
			for (let i = 0; i < 2; i++) {
				arr[i] = num ? bulletRoadJudge(arguments[i]) : tankRoadJudge(arguments[i]);
			}

			return (arr[0] && arr[1]);
		}

		// 坦克路径判断
		function tankRoadJudge(num) {
			switch (num) {
				case undefined:
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
		this.tankRoad = {
			// 这里row = parseInt((this.y - 1) / 16)是因为需要检测的是当前this.y所代表的数组的上一行的数组值，因此减1，dir3同理
			0 : ( row = parseInt((this.y - 1) / 16) , col = parseInt(this.x / 16) ) => {
				return pass(roadMap[row][col] , roadMap[row][col + 1]) && this.y > 0;
			},

			1 : ( row = parseInt(this.y / 16) , col = parseInt(this.x / 16) ) => {
				return pass(roadMap[row][col + 2] , roadMap[row + 1][col + 2]) && this.x < 384;
			},

			2 : ( row = parseInt(this.y / 16) , col = parseInt(this.x / 16) ) => {
				return pass(roadMap[row + 2][col] , roadMap[row + 2][col + 1]) && this.y < 384;
			},

			3 : ( row = parseInt(this.y / 16) , col = parseInt((this.x - 1) / 16) ) => {
				return pass(roadMap[row][col] , roadMap[row + 1][col]) && this.x > 0;
			}
		};


		let arr = [2];
		// 子弹路径判断
		this.bulletRoad = {
			0 : (row = parseInt( (this.bullet_y) / 16) , col = parseInt(this.bullet_x / 16)) => {
				arr[0] = this.bulletRoadJudge(roadMap[row][col] , row , col , 0);
				arr[1] = this.bulletRoadJudge(roadMap[row][col + 1] , row , col + 1 , 1);
				return arr[0] && arr[1] && this.bullet_y > 0;
			},

			// 这里改变this.bullet_x的值是为了方便对子弹的下一个经过的roadMap数组进行判断
			1 : (row = parseInt(this.bullet_y / 16) , col = parseInt((this.bullet_x + 8) / 16)) => {
				arr[0] = this.bulletRoadJudge(roadMap[row][col] , row , col , 0);
				arr[1] = this.bulletRoadJudge(roadMap[row + 1][col] , row + 1 , col , 1);
				return arr[0] && arr[1] && this.bullet_x < 408;
			},

			2 : (row = parseInt((this.bullet_y + 8) / 16) , col = parseInt(this.bullet_x / 16)) => {
				arr[0] = this.bulletRoadJudge(roadMap[row][col] , row , col , 0);
				arr[1] = this.bulletRoadJudge(roadMap[row][col + 1] , row , col + 1 , 1);
				return arr[0] && arr[1] && this.bullet_y < 408;
			},

			3 : (row = parseInt(this.bullet_y / 16) , col = parseInt( (this.bullet_x) / 16)) => {
				arr[0] = this.bulletRoadJudge(roadMap[row][col] , row , col , 0);
				arr[1] = this.bulletRoadJudge(roadMap[row + 1][col] , row + 1 , col , 1);
				return arr[0] && arr[1] && this.bullet_x > 0;
			}
		}

		/**
		 * [bulletRoadJudge description]
		 * @param  {number} num 当前子弹对应的roadMap数组项
		 * @param  {number} row 当前子弹位置对应的roadMap数组中的行数
 		 * @param  {number} col 当前子弹位置对应的roadMap数组中的列数
 		 * @param  {number} i   当前进行处理的这个roadMap数组项是这次处理的第几个（一共有两个，每个的处理方式不同）
		 * @return {boolean}     返回一个布尔值，通过这个值确定子弹是否还能继续往前走
		 */
		this.bulletRoadJudge = function (num , row , col , i) {
			switch (num) {
				// 如果是未定义或者0，直接通过
				case undefined:
				case 0: return true; break;
				// 砖块
				case 1:
					return this.bulletBrickRoad(row , col , i);
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
		this.bulletBrickRoad = function (row , col , i) {
			iBrickObjIndex = row * 16 + col;
			if (oBrickStatus[iBrickObjIndex]) {
				return this.bulletHitBrick(row , col , i);
			} else{
				oBrickStatus[iBrickObjIndex] = [1 , 1 , 1 , 1];
				return this.bulletHitBrick(row , col , i);
			}
		}

		let brickLayer;      //根据子弹的位置计算当前砖块还有几层（一般有两层）
		/**
		 * 子弹击中砖块后相应的处理函数
		 * @param  同上
		 * @return 同上
		 */
		this.bulletHitBrick = function (row , col , i) {
			// 子弹方向为左右
			if (this.iBullet_dir % 2) {
				// this.iBullet_dir%3*8是因为方向不同，子弹的x值并不是一直处于子弹当前前进方向的最面的，下面的y同理
				brickLayer = parseInt( ((this.bullet_x+this.iBullet_dir%3*8) - col * 16) / 8 );
				if (oBrickStatus[iBrickObjIndex][brickLayer + (1 - i) * 2]) {
					oBrickStatus[iBrickObjIndex][brickLayer] = 0;
					oBrickStatus[iBrickObjIndex][brickLayer + 2] = 0;
					cxt.bg.clearRect(35 + brickLayer * 8 + col * 16 , 20 + row * 16 , 8 , 16);
					clearBrick(row , col);
					return false;
				}
				return true;
			// 子弹方向为上下
			} else {
				brickLayer = parseInt( ((this.bullet_y+this.iBullet_dir/2*8) - row * 16) / 8 );
				if (oBrickStatus[iBrickObjIndex][brickLayer * 2 + 1 - i]) {
					oBrickStatus[iBrickObjIndex][brickLayer * 2] = 0;
					oBrickStatus[iBrickObjIndex][brickLayer * 2 + 1] = 0;
					cxt.bg.clearRect(35 + col * 16 , 20 + brickLayer * 8 + row * 16 , 16 , 8);
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
			if( !(oBrickStatus[iBrickObjIndex][0] || oBrickStatus[iBrickObjIndex][1] || oBrickStatus[iBrickObjIndex][2] || oBrickStatus[iBrickObjIndex][3]) ) {
				oBrickStatus[iBrickObjIndex] = null;
				roadMap[row][col] = 0;
				cxt.bg.clearRect(35 + col * 16 , 20 + row * 16 , 16 , 16);
			}
		}
	}
}
