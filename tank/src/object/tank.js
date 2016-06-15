// 坦克的父类
class TankObj {
	constructor(){
		this.x;
		this.y;

		this.posi;  //用来检测当前坦克的位置，如果不在砖块契合处则需要改变位置

		this.posiX;
		this.posiY;


		this.dir;

		this.wheel = 0;
		this.delay = new Delay();   //这个延迟是用来控制出生时候的动画及轮子变化的
	}

	born(){
		// 出生的动画循环执行4次
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
		// cxt.role.drawImage(oImg.bonus , 96 - 32 * this.bornChange , 64 , 32 , 32 , 128 , 384 , 32 , 32);
	}

	dirJudge(){
		switch (this.dir) {
			//向上
			case 0:
				this.y > 0 ? this.y -= 2 : this.y;

				this.posiX = this.x % 16;
				this.posiX && this.positionX();
				// (this.posiX) && this.position(this.x , this.x % 16);
				break;
			//向右
			case 1:
				this.x < 384 ? this.x += 2 : this.x;

				this.posiY = this.y % 16;
				this.posiY && this.positionY();
				// (this.posiY) && this.position(this.y , this.y % 16);
				break;
			//向下
			case 2:
				this.y < 384 ? this.y += 2 : this.y;

				this.posiX = this.x % 16;
				this.posiX && this.positionX();
				// (this.posiX) && this.position(this.x , this.x % 16);
				a();
				break;
			//向左
			case 3:
				this.x > 0 ? this.x -= 2 : this.x;

				this.posiY = this.y % 16;
				this.posiY && this.positionY();
				// (this.posiY) && this.position(this.y , this.y % 16);
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
	// position(posi , rem){
	// 	posi = rem <= 6 ? posi - rem : posi - rem + 16;
	// 	if (posi === this.x) {
	// 		this.x = posi;
	// 	} else {
	// 		this.y = posi;
	// 	}
	// 	console.log(posi);
	// }

	collision(){

	}
}
