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

class MyTank extends TankObj{
	// constructor(){
	// 	super();
	// }

	init(){
		this.dir = 0;          //己方坦克默认方向向下
		this.x = 128;
		this.y =  384;

		this.num1 = 0;

		this.fuck = 0;
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
				hasPressedKey = false;    //按键松开后再检查一遍按键，如果此时上下左右都没有被按下，不管有没有其他按键被按下都将这个值设置为假
				break;
		}
	}

	draw() {


		if (!this.borned) {
			if (this.num1 < 2) {
				if (this.cao) {
					this.num1 ++;
					this.cao = false;
				}
				this.born();
			} else {
				this.num1 = 0;
				this.borned = true;
			}
		} else {
			if (hasPressedKey) {
				this.key();
				this.dirJudge();
			}
			cxtTop.clearRect(0 , 0 , topW , topW);
			this.wheelChange();
			cxtTop.drawImage(oImg.myTank , 0 ,  0 + this.dir * 64 + this.wheel * 32 , 32 , 32 , this.x , this.y , 32 , 32);
		}
	}
}
