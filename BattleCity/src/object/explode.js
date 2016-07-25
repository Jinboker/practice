let aExplodeArr;
// 爆炸效果类
class Explode {
	constructor(x , y) {
		this.x = x;
		this.y = y;

	}

	start(){
		
	}
}

// 小的爆炸效果，继承自爆炸效果类
class SmallExplode extends Explode {
	constructor() {
		super(x , y);
	}
}

// 大的爆炸效果，继承自爆炸效果类
class BigExplode extends Explode {
	constructor(){
		super(x , y);
	}
}
