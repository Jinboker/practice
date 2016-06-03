// class Student extends People {
//     constructor(name, grade) { //构造函数
//         super(name);    //调用父类构造函数
//           this.grade = grade;
//     }
//     sayGrade() {
//           console.log(this.grade);
//     }
// }
//

let myTankImage = new Image();

class MyTank extends TankObj{
	// constructor(){
	// 	super();
	// }

	init(){
		this.dir = 0;          //己方坦克默认方向向下
		this.x = 124;
		this.y =  384;
		myTankImage.src = 'src/object/image/myTank.png';
	}

	key(){
		switch (true) {
			case roleCtrl[keyVal.up1]:
				this.dir = 0;
				break;
			case roleCtrl[keyVal.right1]:
				this.dir = 1;
				break;
			case roleCtrl[keyVal.down1]:
				this.dir = 2;
				break;
			case roleCtrl[keyVal.left1]:
				this.dir = 3;
				break;
			default:
				pressedKey = false;    //按键松开后再检查一遍按键，如果此时上下左右都没有被按下，不管有没有其他按键被按下都将这个值设置为假
				break;
		}
	}

	draw() {
		cxtTop.clearRect(0 , 0 , topW , topW);
		if (pressedKey) {
			this.key();
			this.dirJudge();
		}

		this.wheelChange();
		cxtTop.drawImage(myTankImage , 0 ,  0 + this.dir * 64 + this.wheel * 32 , 32 , 32 , this.x , this.y , 32 , 32);
	}
}
