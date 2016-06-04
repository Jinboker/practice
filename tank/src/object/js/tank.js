// 坦克的父类
class TankObj {
	constructor(){
		this.x;
		this.y;
		this.dir;

		this.num = 0;

		this.wheel = 0;

		//渲染出生时候的动画
		this.borned = false;              //坦克角色是否已经出生
		this.bornNumCont = false;         //是否允许this.bornNum开始累加计数
		this.bornChange = 0;
		this.bornNum = 0;                 //出生的动画循环的次数
	}

	delay(fn , num){
		if (this.num < num) {
			this.num ++;
		} else {
			fn();
			this.num = 0;
		}
	}


	born(){
		if (this.bornNum < 3) {
			if (this.bornNumCont) {
				this.bornNum ++;
				this.bornNumCont = false;   //不允许this.bornNum开始累加
											//直到完整的执行玩一次bornLoop里的全部的技术累加循环后这个值才会为真
			}
			(() => {
				this.delay(() => {
					if (this.bornChange < 4) {
						this.bornChange ++;
					} else {
						cxtBottom.clearRect(163 , 404 , 32 , 32);
						this.bornChange = 0;
						this.bornNumCont = true;      //允许出生的动画循环的次数的值开始累加
					}
					cxtBottom.drawImage(oImg.bonus , 96 - 32 * this.bornChange , 64 , 32 , 32 , 163 , 404 , 32 , 32);
				} , 3);
			})();
		} else {
			this.bornNum = 0;
			this.borned = true;              //出生的动画执行完毕，开始绘制坦克
			cxtBottom.clearRect(163 , 404 , 32 , 32);
		}
	}

	dirJudge(){
		switch (this.dir) {
			//向上
			case 0:
				this.y > 0 ? this.y -= 2 : this.y;
				break;
			//向右
			case 1:
				this.x < 384 ? this.x += 2 : this.x;
				break;
			//向下
			case 2:
				this.y < 384 ? this.y += 2 : this.y;
				break;
			//向左
			case 3:
				this.x > 0 ? this.x -= 2 : this.x;
				break;
			default:
				break;
		}
	}
}
