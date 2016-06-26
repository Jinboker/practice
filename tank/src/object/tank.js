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

// 坦克的父类
class TankObj {
	constructor(){
		this.x;
		this.y;

		this.posi;  //用来检测当前坦克的位置，如果不在砖块契合处则需要改变位置

		this.dir;
		this.dirChange = true;   //坦克是否有改变方向
		this.moveAble;    //坦克是否能够运动（主要是做砖块的检测）

		this.shot;
		this.bulletStatus = true;   //子弹状态，只有当this.bulletStatus及this.fire都为真时才会发射子弹
		this.bx;
		this.by;
		this.shotImg;
		this.xMove;
		this.yMove;

		this.wheel = 0;
		this.delay = new Delay();   //这个延迟是用来控制出生时候的动画及轮子变化的

		this.collision();
		this.fn();
	}


	fn(){
		// 一个立即执行函数吧
		this.doFun = fn => {
			fn();
		}
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
			this.doFun(() => {
				this.delay.do(() => {
					if (this.bornChange < 4) {
						this.bornChange ++;
					} else {
						this.bornChange = 0;
						this.bornNumCont = true;      //出生的动画已经执行完一次，动画执行次数可以开始累加
						cxt.bg.clearRect(163 , 404 , 32 , 32);
					}
					cxt.bg.drawImage(oImg.bonus , 96 - 32 * this.bornChange , 64 , 32 , 32 , 163 , 404 , 32 , 32);
				} , 3);
			});
		} else {
			cxt.bg.clearRect(163 , 404 , 32 , 32);
			this.bornNum = 0;
			this.borned = true;              //出生的动画执行完毕，开始绘制坦克
		}
	}

	tankPosi(){
		//坦克轮子的改变
		this.delay.do(() => this.wheel = +!this.wheel , 5);

		// 坦克变换方向（相邻的方向，不是相对的方向）后相关的准备工作，包括使坦克与砖块契合处对齐和检测当前方向是否可以通行
		this.dirChange && this.positionSet(this.dir);

		switch (this.dir) {
			//向上
			case 0:
				// 如果可以通行，那么运动坦克
				this.moveAble && (this.y -= 2);
				// 如果坦克正好运动到路径数组节点处，那么检测下一个路径是否允许通过
				!(this.y % 16) && ( this.moveAble = this.tankRoad['dir' + 0]());
				break;
			//向右
			case 1:
				this.moveAble && (this.x += 2);
				!(this.x % 16) && ( this.moveAble = this.tankRoad['dir' + 1]());
				break;
			//向下
			case 2:
				this.moveAble && (this.y += 2);
				!(this.y % 16) && ( this.moveAble = this.tankRoad['dir' + 2]());
				break;
			//向左
			default:
				this.moveAble && (this.x -= 2);
				!(this.x % 16) && ( this.moveAble = this.tankRoad['dir' + 3]());
				break;
		}
	}

	//每次坦克改变方向后的相应的设置及检测工作
	positionSet(dir){
		this.dirChange = false;
		if (dir === 0 || dir === 2) {
			let posiX = this.x % 16;
			this.x = posiX <= 6 ? this.x - posiX : this.x - posiX + 16;
		} else {
			let posiY = this.y % 16;
			this.y = posiY <= 6 ? this.y - posiY : this.y - posiY + 16;
		}
		this.moveAble = this.tankRoad['dir' + dir]();
	}

	// 子弹
	bullet(){
		if (this.bulletStatus) {
			this.bulletStatus = false;
			this.bx = this.x;
			this.by = this.y;
			this.bDir = this.dir;
			switch (this.bDir) {
				case 0:
					// 因为this.bx是等于this.x的，因此要将this.bx的位置改变为坦克正中心
					this.bx += 12;
					this.moveX = 0;
					this.moveY = -4;
					this.shotImg = m_canT;
					break;
				case 1:
					this.bx += 24;
					this.by += 12;
					this.moveX = 4;
					this.moveY = 0;
					this.shotImg = m_canR;
					break;
				case 2:
					this.bx += 12;
					this.by += 24;
					this.moveX = 0;
					this.moveY = 4;
					this.shotImg = m_canD;
					break;
				default:
					this.by += 12;
					this.moveX = -4;
					this.moveY = 0;
					this.shotImg = m_canL;
					break;
			}
		}
		if ( this.bulletRoad['dir' + this.bDir]() ){
			this.bx += this.moveX;
			this.by += this.moveY;
			cxt.role.drawImage(this.shotImg , this.bx , this.by , 8 , 8);
		} else {
			oAud.attOver.play();
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

			if (arr[0] && arr[1]) {
				return true;
			}
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
			dir0 : ( row = parseInt((this.y - 1) / 16) , col = parseInt(this.x / 16) ) => {
				return pass(roadMap[row][col] , roadMap[row][col + 1] , 0) && this.y > 0;
			},

			dir1 : ( row = parseInt(this.y / 16) , col = parseInt(this.x / 16) ) => {
				return pass(roadMap[row][col + 2] , roadMap[row + 1][col + 2] , 0) && this.x < 384;
			},

			dir2 : ( row = parseInt(this.y / 16) , col = parseInt(this.x / 16) ) => {
				return pass(roadMap[row + 2][col] , roadMap[row + 2][col + 1] , 0) && this.y < 384;
			},

			dir3 : ( row = parseInt(this.y / 16) , col = parseInt((this.x - 1) / 16) ) => {
				return pass(roadMap[row][col] , roadMap[row + 1][col] , 0) && this.x > 0;
			}
		};

		// 子弹路径判断
		function bulletRoadJudge(num) {
			switch (num) {
				case undefined:
				case 0: return true; break;
				case 1:
				case 2: return false; break;
				// 子弹过老家那么游戏结束
				case 5: draw.gameover = true; return false; break;
				// 河流跟冰路直接过（默认是3和4，最少）
				default: return true; break;
			}
		}

		this.bulletRoad = {
			dir0 : (row = parseInt(this.by / 16) , col = parseInt(this.bx / 16)) => {
				return pass(roadMap[row][col] , roadMap[row][col + 1] , 1) && this.by > 0;
			},

			// 这里改变this.bx的值是为了方便对子弹的下一个经过的roadMap数组进行判断
			dir1 : (row = parseInt(this.by / 16) , col = parseInt((this.bx + 8) / 16)) => {
				return pass(roadMap[row][col] , roadMap[row + 1][col] , 1) && this.bx < 408;
			},

			dir2 : (row = parseInt((this.by + 8) / 16) , col = parseInt(this.bx / 16)) => {
				return pass(roadMap[row][col] , roadMap[row][col + 1] , 1) && this.by < 408;
			},

			dir3 : (row = parseInt(this.by / 16) , col = parseInt(this.bx / 16)) => {
				return pass(roadMap[row][col] , roadMap[row + 1][col] , 1) && this.bx > 0;
			}
		}
	}
}
