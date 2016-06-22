/**
 * 动画回调函数
 */
let requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

/**
 * 循环延时
 */
class Delay{
	constructor(){
		this.num = 0;
	}

	/**
	 * [do description]
	 * @param  {Function} fn  延时后需要执行的函数
	 * @param  {number}   num 需要延迟多少个循环
	 */
	do(fn , num){
		if (this.num < num) {
			this.num ++;
		} else {
			fn();
			this.num = 0;
		}
	}
}

function a() {
	console.log('a');
}
function b() {
	console.log('b');
}
