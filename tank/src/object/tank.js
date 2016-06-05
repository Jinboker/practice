// 坦克的父类
class TankObj {
	constructor(){
		this.x;
		this.y;
		this.dir;

		this.wheel = 0;
		this.delay = new Delay();   //这个延迟是用来控制出生时候的动画及轮子变化的
	}

	born(){
		// 出生的动画循环执行三次
		if (this.bornNum < 3) {
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
						cxt.bg.clearRect(163 , 404 , 32 , 32);
						this.bornChange = 0;
						this.bornNumCont = true;      //允许出生的动画循环的次数的值开始累加
					}
					//因为角色层每次循环都会清空画布，如果这里再延迟，那么会有较长时间页面上无显示，因此将出生的动画放在背景层
					cxt.bg.drawImage(oImg.bonus , 96 - 32 * this.bornChange , 64 , 32 , 32 , 163 , 404 , 32 , 32);
				} , 3);
			})();
		} else {
			this.bornNum = 0;
			this.borned = true;              //出生的动画执行完毕，开始绘制坦克
			cxt.bg.clearRect(163 , 404 , 32 , 32);
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
