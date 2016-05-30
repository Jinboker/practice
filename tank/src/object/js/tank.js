class TankObj {
	constructor(){
		this.x;
		this.y;
	}

	init(){
		this.x = 0;
		this.y = 0;

		this.tankImage = new Image();
		this.tankImage.src = 'src/object/image/myTank.png';
	}

	draw() {
		
		cxtTop.drawImage(this.tankImage , 0 ,  64 , 32 , 32 , 4 * box , 12 * box , box , box);
	}
}
