let myTankImage = new Image();


class TankObj {
	constructor(){
		this.x;
		this.y;
	}

	init(){
		this.x = 0;
		this.y = 0;

		myTankImage.src = 'src/object/image/myTank.png';
	}

	draw() {
		cxtTop.drawImage(myTankImage , 0 ,  64 , 32 , 32 , 4 * box , 12 * box , box , box);
	}
}
