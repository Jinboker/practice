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

		this.dir;
		this.dirChange = true;   //坦克是否有改变方向
		this.tankMoveAble;    //坦克是否能够运动（主要是做砖块的检测）

		this.shot;
		this.bulletStatus = true;   //子弹状态，只有当this.bulletStatus及this.fire都为真时才会发射子弹
		this.bullet_x;
		this.bullet_y;
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

		// 因为方向是由0、1、2、3（上、右、下、左）来表示的，所以通过this.dir % 2就能判断具体是上下还是左右
		if (this.dir % 2) {
			// 如果可以通行，那么运动坦克
			// 因为this.dir % 2为真，那么this.dir正好为1或3（右、左），减1后判断是否为真就能确定是左还是右了，再执行相应的操作
			(this.dir - 1) ? ( this.tankMoveAble && (this.x -= 2) ) : ( this.tankMoveAble && (this.x += 2) );
			// 如果坦克正好运动到路径数组节点处，那么检测下一个路径是否允许通过
			!(this.x % 16) && ( this.tankMoveAble = this.tankRoad['dir' + this.dir]());
		} else {
			this.dir ? ( this.tankMoveAble && (this.y += 2) ) : ( this.tankMoveAble && (this.y -= 2) );
			!(this.y % 16) && ( this.tankMoveAble = this.tankRoad['dir' + this.dir]());
		}
	}

	//每次坦克改变方向后的相应的设置及检测工作
	positionSet(dir){
		this.dirChange = false;
		if (dir % 2) {
			// 左右方向的设置
			let posiY = this.y % 16;
			this.y = posiY <= 6 ? this.y - posiY : this.y - posiY + 16;
		} else {
			// 上下方向的设置
			let posiX = this.x % 16;
			this.x = posiX <= 6 ? this.x - posiX : this.x - posiX + 16;
		}
		this.tankMoveAble = this.tankRoad['dir' + dir]();
	}

	// 子弹
	bullet(){
		if (this.bulletStatus) {
			this.bulletStatus = false;
			this.bullet_x = this.x;
			this.bullet_y = this.y;
			this.bDir = this.dir;

			// this.bullet_x及this.bullet_y代表了子弹的位置，因为子弹绘制的地点与this.x和this.y不同，因此需要根据方向改变位置
			switch (this.bDir) {
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
		if ( this.bulletRoad['dir' + this.bDir]() ){
			this.bullet_x += this.moveX;
			this.bullet_y += this.moveY;
			cxt.role.drawImage(this.shotImg , this.bullet_x , this.bullet_y , 8 , 8);
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
			dir0 : (row = parseInt(this.bullet_y / 16) , col = parseInt(this.bullet_x / 16)) => {
				return pass(roadMap[row][col] , roadMap[row][col + 1] , 1) && this.bullet_y > 0;
			},

			// 这里改变this.bullet_x的值是为了方便对子弹的下一个经过的roadMap数组进行判断
			dir1 : (row = parseInt(this.bullet_y / 16) , col = parseInt((this.bullet_x + 8) / 16)) => {
				return pass(roadMap[row][col] , roadMap[row + 1][col] , 1) && this.bullet_x < 408;
			},

			dir2 : (row = parseInt((this.bullet_y + 8) / 16) , col = parseInt(this.bullet_x / 16)) => {
				return pass(roadMap[row][col] , roadMap[row][col + 1] , 1) && this.bullet_y < 408;
			},

			dir3 : (row = parseInt(this.bullet_y / 16) , col = parseInt(this.bullet_x / 16)) => {
				return pass(roadMap[row][col] , roadMap[row + 1][col] , 1) && this.bullet_x > 0;
			}
		}
	}
}
