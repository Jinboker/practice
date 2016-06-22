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

		this.posiX;
		this.posiY;

		this.dir;

		this.shot;
		this.bulletStatus = true;   //子弹状态，只有当this.bulletStatus及this.fire都为真时才会发射子弹
		this.bx;
		this.by;
		this.shotImg;
		this.xMove;
		this.yMove;

		this.wheel = 0;
		this.delay = new Delay();   //这个延迟是用来控制出生时候的动画及轮子变化的
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
			(() => {
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
			})();
		} else {
			cxt.bg.clearRect(163 , 404 , 32 , 32);
			this.bornNum = 0;
			this.borned = true;              //出生的动画执行完毕，开始绘制坦克
		}
	}

	misc(){
		// 判断正前方是否有障碍物导至无法通行
		this.roadArrJudge = [
			// 上
			(num , row , col , x , y) => {
				return !!(y > 0) && !roadMap[row][col] && !roadMap[row][col + 1] ?  true : false;
			},
			// 右
			(num , row , col , x , y) => {
				return !!(x < num) && !roadMap[row][col + 2] && !roadMap[row + 1][col + 2] ? true : false;
			},
			// 下
			(num , row , col , x , y) => {
				return !!(y < num) && !roadMap[row + 2][col] && !roadMap[row + 2][col + 1] ? true : false;
			},
			// 左
			(num , row , col , x , y) => {
				return !!(x > 0) && !roadMap[row][col] && !roadMap[row + 1][col] ? true :  false;
			}
		];
	}

	move(){
		//坦克轮子的改变
		this.delay.do(() => this.wheel = +!this.wheel , 5);
		switch (this.dir) {
			//向上
			case 0:
				if (this.roadArrJudge[0](384 , parseInt(this.y / 16) , parseInt(this.x / 16) , this.x , this.y)) { this.y -= 2; }
				this.posiX = this.x % 16;
				this.posiX && this.positionX();
				break;
			//向右
			case 1:
				if (this.roadArrJudge[1](384 , parseInt(this.y / 16) , parseInt(this.x / 16) , this.x , this.y)) { this.x += 2; }
				this.posiY = this.y % 16;
				this.posiY && this.positionY();
				break;
			//向下
			case 2:
				if (this.roadArrJudge[2](384 , parseInt(this.y / 16) , parseInt(this.x / 16) , this.x , this.y)) { this.y += 2; }
				this.posiX = this.x % 16;
				this.posiX && this.positionX();
				break;
			//向左
			default:
				if (this.roadArrJudge[3](384 , parseInt(this.y / 16) , parseInt(this.x / 16) , this.x , this.y)) { this.x -= 2; }
				this.posiY = this.y % 16;
				this.posiY && this.positionY();
				break;
		}
	}

	//每次坦克改变方向的时候都要重置一下位置使坦克正中间对准砖块的契合处
	positionX(){
		this.x = this.posiX <= 6 ? this.x - this.posiX : this.x - this.posiX + 16;
	}
	positionY(){
		this.y = this.posiY <= 6 ? this.y - this.posiY : this.y - this.posiY + 16;
	}

	// 子弹
	bullet(){
		if (this.shot) {
			if (this.bulletStatus) {
				this.bulletStatus = false;
				this.bx = this.x;
				this.by = this.y;
				this.bDir = this.dir;

				switch (this.bDir) {
					case 0:
						this.bx += 12;
						this.moveX = 0;
						this.moveY = -4;
						this.shotImg = m_canT;
						break;
					case 1:
						this.bx += 28;
						this.by += 12;
						this.moveX = 4;
						this.moveY = 0;
						this.shotImg = m_canR;
						break;
					case 2:
						this.bx += 12;
						this.by += 28;
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
			if (this.roadArrJudge[this.bDir](408 , parseInt(this.by / 16) , parseInt(this.bx / 16) , this.bx , this.by)) {
				this.bx += this.moveX;
				this.by += this.moveY;
				cxt.role.drawImage(this.shotImg , this.bx , this.by , 8 , 8);
			} else {
				this.shot = false;
				this.bulletStatus = true;
			}
		}
	}
}
