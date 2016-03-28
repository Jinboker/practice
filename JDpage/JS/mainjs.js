window.onload = function(){
	// 焦点图的初始化
	aSliderImage[0].style.opacity = 1;
	aSliderImage[0].style.filter = 'alpha(opacity:100)';

	focus ();
	hideLayers ();
	visbleCategory();
	toolbar ();
	recommend();
}

//一些公用的对象及数组
var oTop = document.getElementById('top');
var oHead = document.getElementById('head');
var oNav = document.getElementById('nav');
var oFocus = document.getElementById('focus');
var oSlider = document.getElementById('slider');
var aSliderImage = oSlider.getElementsByTagName('li');
var oSliderNav = document.getElementById('slider_nav');
var aSliderList = oSliderNav.getElementsByTagName('li');

//工具函数
/**
 *getClass,根据父元素获取class
 *@param ｛object｝oParent 想要获取的class的父元素对象
 *@param ｛string｝sClass 想要获取的class的class值
 */
function getClass (oParent,sClass) {
	var aResult = [];
	var re = new RegExp('\\b'+sClass+'\\b','i');

	if (oParent.getElementsByClassName) {
		return	oParent.getElementsByClassName(sClass);
	} else{
		var aElem = oParent.getElementsByTagName('*');
		for (var i = 0; i < aElem.length; i++) {
			if (re.test(aElem[i].className)) {
				aResult.push(aElem[i]);
			};
		};
		return aResult;
	};
}

/**
 * 获取元素的当前样式，主要是为了兼容IE
 * @param {object} oEle 想要获取的样式的对象
 * @param {string} value 想要获取的样式
 */
function getStyle (oEle , value) {
	return oEle.currentStyle ? oEle.currentStyle[value] : getComputedStyle(oEle, null)[value];
}

/**
 * 运动框架
 * @param {object} oEle 想要运动的那个对象
 * @param {number} iTarget 运动的目标值
 * @param {string｝value 想要去运动的样式
 */
function move (oEle , iTarget , value) {
	clearInterval(oEle.timer);

	oEle.timer = setInterval(function  () {
		var iSpeed = null;
		var iCur = null;
		// 获取透明度IE8以前的写法
		if (value == 'opacity') {
			iCur = parseInt( parseFloat(getStyle(oEle , value))*100 );
		// 标准写法
		} else{
			iCur = parseInt(getStyle(oEle , value));
		}
		// 缓冲运动速度值
		iSpeed = (iTarget - iCur)/8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		// 检测是否运动到目标，如果没有继续运动
		if (iCur == iTarget) {
			clearInterval(oEle.timer);
		} else{
			if (value == 'opacity') {
				oEle.style.opacity = (iCur + iSpeed)/100;
				oEle.style.filter = 'alpha(opacity:'+ (iCur + iSpeed) +')';
			} else{
				oEle.style[value] = iCur + iSpeed + 'px';
			}
		}
	},10);
}

/**
 * 轮播图运动
 * @param ｛number｝iIndex 索引值，具体让第几张图片显示
 */
function doMove (iIndex) {
	for (var i = 0; i < aSliderList.length; i++) {
		if (aSliderImage[i].className == 'currentSlider') {
			aSliderImage[i].className = aSliderList[i].className = '';
			//move工具函数
			move(aSliderImage[i] , 0 ,'opacity');
		};
	};
	aSliderImage[iIndex].className = aSliderList[iIndex].className = 'currentSlider';
	//move工具函数
	move (aSliderImage[iIndex] , 100 , 'opacity');
}
// 工具函数结束


// 页面逻辑
/**
 * top及购物车全部的隐藏的显示函数
 */
function hideLayers () {
	var aTopDropdown = getClass(oTop,'top_dropdown');
	var aDropLayer = getClass(oTop,'drop_layer');
	var aTopBlock = getClass(oTop,'block');
	var oTopAddr = document.getElementById('top_addr');
	var aAddr = document.getElementById('addr').getElementsByTagName('a');
	var obuyCar = document.getElementById('buyCar');
	var oHideBuyCar = document.getElementById('hideBuyCar');
	var aBuyCarBlock = getClass(obuyCar,'block');
	//top栏的隐藏显示
	for (var i = 0; i < aTopDropdown.length; i++) {
		aTopDropdown[i].index = i;
		aTopDropdown[i].onmouseover = function  () {
			this.className = 'top_dropdownchange top_bar';
			aTopBlock[this.index].style.display = aDropLayer[this.index].style.display = 'block';
		}
		aTopDropdown[i].onmouseout = function  () {
			this.className = 'top_dropdown top_bar';
			aTopBlock[this.index].style.display = aDropLayer[this.index].style.display = 'none';
		}
	};
	//top栏左侧地址选择时候的效果
	for (var i = 0; i < aAddr.length; i++) {
		aAddr[i].onmouseover = function  () {
			this.className = "adder_change";
		}
		aAddr[i].onmouseout = function  () {
			this.className = '';
		}
		aAddr[i].onclick = function  () {
			if (this.style.backgroundColor != '#c81623') {
				for (var i = 0; i < aAddr.length; i++) {
					aAddr[i].style.backgroundColor = '';
					aAddr[i].style.color = '';
				};
				this.style.backgroundColor = '#c81623';
				this.style.color = 'white';
				oTopAddr.innerHTML = this.innerHTML;
			};
		}
	};
	//购物车的隐藏显示
	oHideBuyCar.onmouseover = obuyCar.onmouseover = function  () {
		aBuyCarBlock[0].style.display = oHideBuyCar.style.display = 'block';
		obuyCar.className = 'fr hidebuyCarClass';
	}
	oHideBuyCar.onmouseout = obuyCar.onmouseout = function  () {
		aBuyCarBlock[0].style.display = oHideBuyCar.style.display = 'none';
		obuyCar.className = 'fr buyCar1';
	}
}
/*top及购物车全部的隐藏的显示函数结束*/

/**
 * 详细商品栏的显示与隐藏
 */
function visbleCategory () {
	var oCategory = document.getElementById('category');
	var aVisbleCategory = getClass(oCategory,'visble_category');
	var aHideLayers = getClass(oNav,'hide_layers');
	for (var i = 0; i < aVisbleCategory.length; i++) {
		aVisbleCategory[i].index = i;
		aHideLayers[i].index = i;
		//可见的详细商品栏
		aVisbleCategory[i].onmouseover = function () {
			this.className = 'unvisble_category';
			aHideLayers[this.index].style.display = 'block';
		};
		aVisbleCategory[i].onmouseout = function () {
			this.className = 'visble_category';
			aHideLayers[this.index].style.display = 'none';
		};
		//不可见的详细商品栏
		// aHideLayers[i].onmouseover = function  () {
		// 	this.style.display = 'block';
		// 	aVisbleCategory[this.index].className = 'visble_category';
		// };
		// aHideLayers[i].onmouseout = function  () {
		// 	this.style.display = 'none';
		// 	aVisbleCategory[this.index].className = 'unvisble_category';
		// };
	}
}
/*详细商品栏的显示与隐藏结束*/

/**
 * 焦点图
 */
var oFocusPic = document.getElementById('FocusPic');
var oSliderBtn = document.getElementById('slider_btn');
function focus () {
	var oBtnPrev = getClass(oSliderBtn , 'btn_prev')[0];
	var oBtnNext = getClass(oSliderBtn , 'btn_next')[0];
	var iNow = 1;
	var playTimer = null;
	var timer = null;
	// 自动播放
	playTimer = setInterval(function  () {
		// doMove工具函数
		doMove (iNow);
		if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;};
	},3500);
	//鼠标移入焦点图的区域自动播放暂停
	oFocusPic.onmouseover = function  () {
		clearInterval(playTimer);
	}
	// 鼠标移出后开启自动播放
	oFocusPic.onmouseout = function  () {
		playTimer = setInterval(function  () {
			doMove (iNow);
			if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;};
		},3500);
	}
	//前后按钮
	for (var i = 0; i < aSliderImage.length; i++) {
		//按钮显示
		oSliderBtn.onmouseover = aSliderImage[i].onmouseover = function  () {
			oSliderBtn.style.display='block';
		};
		oSliderBtn.onmouseout = aSliderImage[i].onmouseout = function  () {
			oSliderBtn.style.display='none';
		};
		// 点击按钮时图片切换
		oBtnPrev.onclick = function  () {
			if (iNow > 1) {iNow = iNow-1;} else{iNow = (aSliderList.length-1);};
			doMove (iNow);
		}
		oBtnNext.onclick = function  () {
			if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;};
			doMove (iNow);
		}
	};
	//轮播图上的list鼠标移入切换图片
	for (var i = 0; i < aSliderList.length; i++) {
		aSliderList[i].index = i;
		aSliderList[i].onmouseover = function  () {
			var that = this;
			clearTimeout(timer);
			if (this.style.backgroundColor != '#C81623') {
				timer = setTimeout(function  () {
					doMove (that.index);
					iNow = that.index;
				},400);
			}
		};
	}
}
/*焦点图结束*/

/**
 * 右边工具栏显示与隐藏
 */
function toolbar () {
	var oToolbar = document.getElementById('gobal-toolbar');
	var aLi = oToolbar.getElementsByTagName('li');
	var aText = oToolbar.getElementsByTagName('p');
	var aIcon = oToolbar.getElementsByTagName('i');
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].timer = null;
		aLi[i].onmouseover = function  () {
			clearTimeout(this.timer);
			var that = this;
			aIcon[this.index].style.backgroundColor = '#C81623';
			this.timer = setTimeout(function  () {
				//工具栏上面的五个隐藏着的工具要比下面五个宽20px；
				if (that.index < 5) {
					move(aText[that.index] , 65 , 'right');
				} else{
					move(aText[that.index] , 45 , 'right');
				};
			},300);
		}
		aLi[i].onmouseout = function  () {
			clearTimeout(this.timer);
			aIcon[this.index].style.backgroundColor = '#7a6e6e';
			move(aText[this.index] , 0 , 'right');
		}
	};
}
/*右边工具栏显示与隐藏*/
/*推荐栏商品左右滑动*/
function recommend() {
	var oRecommend = document.getElementById('recommend');
	var aUl = oRecommend.getElementsByTagName('ul');
	var aLi = oRecommend.getElementsByTagName('li');
	aUl[0].style.width = 250*aLi.length + 'px';
}
