// 坦克的父类
class TankObj {
	constructor(){
		this.x;
		this.y;
		this.dir;

		this.num = 0;
		this.bornChange = 0;
		this.wheel = 0;

		this.borned = false;
		this.cao = false;
	}

	wheelChange(){
		if (this.num < 5) {
			this.num ++;
		} else {
			this.wheel = +!this.wheel;
			this.num = 0;
		}
	}

	born(){
		if (this.num < 3) {
			this.num ++;
		} else {
			if (this.bornChange < 5) {
				this.bornChange ++;
				cxtTop.drawImage(oImg.bonus , 96 - 32 * this.bornChange , 64 , 32 , 32 , 128 , 384 , 32 , 32);
			} else {
				cxtTop.clearRect(0 , 0 , topW , topW);
				this.bornChange = 0;
				cxtTop.drawImage(oImg.bonus , 96 - 32 * this.bornChange , 64 , 32 , 32 , 128 , 384 , 32 , 32);
				this.cao = true;
			}
			this.num = 0;
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
