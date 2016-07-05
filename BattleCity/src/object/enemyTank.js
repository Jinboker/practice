/**
 * 敌方坦克对象，继承自TankObj
 */
class EnemyObj extends TankObj {
	constructor() {
		super();
		this.init();
	}

	init(){
		this.iDir = 2;
		this.x = null;
		this.y = 0;
	}
}
