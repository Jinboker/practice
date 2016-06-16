// 坦克的父类
class TankObj {
	constructor(){
		this.x;
		this.y;

		this.posi;  //用来检测当前坦克的位置，如果不在砖块契合处则需要改变位置

		this.posiX;
		this.posiY;

		this.dir;
		this.row;
		this.col;

		this.fire = false;          //默认不开火
		this.bulletStatus = true;   //子弹状态，只有当this.bulletStatus及this.fire都为真时才会发射子弹
		this.bx;
		this.by;
		this.bDir;

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

	move(){
		//坦克轮子的改变
		this.delay.do(() => this.wheel = +!this.wheel , 5);

		this.col = parseInt(this.x / 16);
		this.row = parseInt(this.y / 16);
		switch (this.dir) {
			//向上
			case 0:
				this.posiX = this.x % 16;

				if (this.y > 0 && !roadMap[this.row][this.col] && !roadMap[this.row][this.col + 1]) {
					this.y -= 2;
				}
				this.posiX && this.positionX();
				break;
			//向右
			case 1:
				this.posiY = this.y % 16;

				if (this.x < 384 && !roadMap[this.row][this.col + 2] && !roadMap[this.row + 1][this.col + 2]) {
					this.x += 2;
				}

				this.posiY && this.positionY();
				break;
			//向下
			case 2:
				this.posiX = this.x % 16;

				if (this.y < 384 && !roadMap[this.row + 2][this.col] && !roadMap[this.row + 2][this.col + 1]) {
					this.y += 2;
				}
				this.posiX && this.positionX();
				break;
			//向左
			case 3:
				this.posiY = this.y % 16;

				if (this.x > 0 && !roadMap[this.row][this.col] && !roadMap[this.row + 1][this.col]) {
					this.x -= 2;
				}
				this.posiY && this.positionY();
				break;
			default:
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
		if (this.bulletStatus) {
			this.bulletStatus = false;
			this.bx = this.x;
			this.by = this.y;
			this.bDir = this.dir;
		}

		switch (this.bDir) {
			case 0:
				// this.by = this.y;
				this.bx += 4;
				break;
			case 1:

				break;
			case 2:

				break;
			case 3:

				break;
			default:
				break;
		}
		cxt.role.drawImage(oImg.misc , this.dir * 8 , 8 , 8 , 8, this.bx , this.by , 8 , 8);
	}

	collision(){

	}
}
