class EnemyTank extends TankObj{
	// constructor(){
	// 	super();
	// }

	init(){
		enemyTankImage.src = 'src/object/image/enemyTank.png';
	}

	draw() {
		cxtTop.drawImage(enemyTankImage , 0 ,  64 , 32 , 32 , 4 * 32 , 12 * 32 , 32 , 32);
	}


}
