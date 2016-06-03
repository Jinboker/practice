class TankObj {
	constructor(){
		this.x;
		this.y;
		this.dir;
		this.wheel = 0;
		this.num = 0;
	}

	wheelChange(){
		if (this.num < 5) {
			this.num ++;
		} else {
			this.wheel = +!this.wheel;
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
