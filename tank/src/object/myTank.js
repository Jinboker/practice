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
let tankLife = 2;
class MyTank extends TankObj{
	// constructor(){
	// 	super();
	// }

	init(){
		this.x = 128;
		this.y =  384;
		this.dir = 0;          //己方坦克默认方向向下

		this.a = 0;
		//渲染出生时候的动画
		this.borned = false;              //坦克角色是否已经出生
		this.bornNumCont = false;         //是否允许this.bornNum开始累加计数
		this.bornChange = 0;
		this.bornNum = 0;                 //出生的动画循环的次数

		// 防护罩
		this.shieldLoopNumSet = true;         //是否设置防护罩的执行次数
		this.shieldNum = 0;                   //防护罩的执行次数
		this.shieldNumSave = 0;               //防护罩执行次数的保存
		this.shieldAble = true;               //是否具有防护罩，默认有，在防护罩时间结束后被关闭
		this.shieldPicPos = 0;               //决定防护罩显示的是哪部分的图片
		this.shieldDelay = new Delay();    //这个是用来控制防护罩变化的延迟

		this.shot = false;     //己方坦克默认不射击

		this.misc();
	}

	//按键判断
	btn(){
		// 看是否按下了上下左右，为真则重新设置坦克坐标
		if (keyDir_1 && keyInfo[keyDir_1].pressed) {
			this.dir = keyInfo[keyDir_1].dir;
			this.move();
		}

		// 开始/暂停，H键
		if (!keyInfo[72].pressed) {
			startAble = true;
		}
		if (startAble && keyInfo[72].pressed) {
			draw.tank = false;
			draw.stop = true;
			stopSet = true;
			startAble = false;
		}

		//发射子弹，J键
		if (keyInfo[74].pressed) {
			this.shot = true;
		}
	}

	// 防护罩相关
	shield(){
		if (this.shieldLoopNumSet) {
			this.shieldNum = oBonus.shield ? 1000 : 200;   //如果有防护罩，则循环1000次，没有则循环200次
			this.shieldLoopNumSet = false;
		}
		if (this.shieldNumSave < this.shieldNum) {
			this.shieldNumSave ++;
			this.shieldDelay.do(() => this.shieldPicPos = +! this.shieldPicPos , 3);   // 每隔3次循环改变一下防护罩的图片
			cxt.role.drawImage(oImg.misc , 32 + this.shieldPicPos * 32 , 0 , 32 , 32 , this.x , this.y , 32 , 32);
		} else {
			this.shieldNumSave = 0;
			this.shieldAble = false;
		}
	}

	draw() {
		// 判断坦克是否需要出生
		if (!this.borned) {
			this.born();
			return;
		}

		// 按键判断，再执行相应的操作
		keyPressed && this.btn();

		//绘制子弹，只有当按键J按下的时候this.shot才会为真
		this.shot && this.bullet();

		// 防护罩（刚出生时候或者吃了防护罩的奖励）
		this.shieldAble && this.shield();

		// 绘制坦克
		cxt.role.drawImage(oImg.myTank , 0 ,  0 + this.dir * 64 + this.wheel * 32 , 32 , 32 , this.x , this.y , 32 , 32);
	}
}
