/*------------------------------------- 工具包函数 -----------------------------------------*/
/**
 * 把多个函数同时绑定到onload事件上面
 * @param {function} fn 想要添加至onload的函数
 */
function myReady (fn) {
	var oldonload = window.onload;
    //如果onload没有绑定过函数
	if (typeof window.onload != 'function'){
		window.onload = fn;
	}else{
		window.onload = function () {
			oldonload();
    		fn();
    	};
    }
}

/**
 *事件添加函数
 * @param {Object}   obj  需要绑定事件的对象
 * @param {String}   type 事件类型
 * @param {Function} fn   事件触发执行的函数
 */
function myAddEvent(obj, type, fn) {
    //标准
    if (obj.addEventListener) {
        obj.addEventListener(type, function (ev) {
            if ( false === fn.call(obj)) {
                ev.cancelBubble = true;
                ev.preventDefault();
            }
        }, false);
    } else {
        //IE
        obj.attachEvent("on" + type, function () {
            if (false === fn.call(obj)) {
                event.cancelBubble = true;
                return false;
            }
        });
    }
}

 /**
 *获取实际样式函数
 * @param   {Object} 	obj  	需要获取样式的对象
 * @param   {String} 	attr 	获取的样式名
 */
function getStyle(obj, attr) {
    //IE写法
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    //标准
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

/**
*是否有某个class
* @param   {Object}     obj     需要检测是否含有class的对象
* @param   {String}     sClass  class
*/
function hasClass(obj, sClass) {
    return obj.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)'));
}

/**
*添加class
* @param   {Object} 	obj  	需要添加class的对象
* @param   {String} 	sClass 	添加的class
*/
function addClass(obj, sClass) {
    obj.className === '' ? obj.className = sClass : obj.className = obj.className + ' ' + sClass;
}

/**
*去掉class
* @param   {Object} 	obj  	需要去掉class的对象
* @param   {String} 	sClass 	去掉的class
*/
function removeClass(obj , sClass) {
	if ( hasClass(obj, sClass) ) {
		var reg = new RegExp('(\\s|^)' + sClass + '(\\s|$)','i');
	    obj.className = obj.className.replace(reg, '');
	}
}

/**
*切换class
* @param   {Object}     obj     需要切换class的对象
* @param   {String}     sClass  切换的class
*/
function toggleClass(obj , sClass){
    hasClass(obj , sClass) ? removeClass(obj , sClass) : addClass(obj , sClass);
}

/**
*hover函数
* @param   {Object}       obj     需要执行classHover的对象
* @param   {function}     fnOver  鼠标移入函数
* @param   {function}     fnOut   鼠标移出函数
*/
function hover(obj , fnOver , fnOut) {
    myAddEvent(obj , 'mouseover' , fnOver);
    myAddEvent(obj , 'mouseout' , fnOut);
}

/**
*classHover
* @param   {Object}       obj     需要执行classHover的对象
* @param   {function}     fn      鼠标移入移出时的函数
*/
function classHover(obj , fn) {
    myAddEvent(obj , 'mouseover' , fn);
    myAddEvent(obj , 'mouseout' , fn);
}

/**
 * 任意值的缓冲运动框架
 * @param {object}   oEle         想要运动的那个对象
 * @param {json}     json         运动的目标
 * @param {number}   iCtrSpeed    可选，用来控制运动速度，默认为30
 * @param {function｝fn           可选，链式运动函数
 */
function move (oEle , json , iCtrSpeed , fn) {
    clearInterval(oEle.timer);

    if (!iCtrSpeed) {iCtrSpeed = 30;}

    oEle.timer = setInterval(function  () {
        
        var bStop = true;
        for (var attr in json) {
            var iSpeed = null;
            var iCur = null;
            if (attr === 'opacity') {
                iCur = parseInt( parseFloat(getStyle(oEle , attr))*100 );
            } else {
                iCur = parseInt(getStyle(oEle , attr));
            }

            // 缓冲运动速度值
            iSpeed = (json[attr] - iCur)/8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            // 检测是否运动到目标，如果没有继续运动
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr === 'opacity') {
                oEle.style.opacity = (iCur + iSpeed)/100;
                oEle.style.filter = 'alpha(opacity:'+ (iCur + iSpeed) +')';
            } else {
                oEle.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bStop) {
            clearInterval(oEle.timer);
            fn && fn();
        }
    },iCtrSpeed);
}
/*------------------------------------- 工具包函数 -----------------------------------------*/


/*------------------------------------ 页面流程开始 ----------------------------------------*/
/**
 * top、head及nav栏
 */
myReady(function () {
	var i = null,
        oDoc = document;

    // top栏及购物车隐藏显示
    var aDropContent = oDoc.querySelectorAll('.js-has-drop-content');
        iHideLen = aDropContent.length;

    for (i = 0; i < iHideLen; i++) {
        classHover(aDropContent[i] , function () {
            toggleClass(this , 'is-current');
        });
    }

	// top栏地址选择
    var oVisibleAddr = oDoc.querySelector('.js-visible-addr'),
        oChooseAddr = oDoc.querySelector('.js-choose-addr'),
        aLi = oChooseAddr.getElementsByTagName('a'),
        iLiLen = aLi.length;

    myAddEvent(oChooseAddr , 'click' , function (ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;

        if (target.nodeName.toLowerCase() === 'a') {
            for (var i = 0; i < iLiLen; i++) {
                if (aLi[i].className === 'is-choose') {
                    aLi[i].className = '';
                }
            }
            target.className = 'is-choose';
            oVisibleAddr.innerHTML = target.innerHTML;
        }
    });

    // 详细商品栏的显示隐藏
    var aCategoryLi = oDoc.querySelector('.js-has-side-content').getElementsByTagName('li'),
        aHideCategory = oDoc.querySelectorAll('.js-hide-category'),
        iCategoryLen = aCategoryLi.length;

    for (i = 0; i < iCategoryLen; i++) {
        aCategoryLi[i].index = i;
        aHideCategory[i].index = i;
        classHover(aCategoryLi[i] , function () {
            toggleClass(this , 'is-current');
            toggleClass(aHideCategory[this.index] , 'is-current');
        });
        classHover(aHideCategory[i] , function () {
            toggleClass(this , 'is-current');
            toggleClass(aCategoryLi[this.index] , 'is-current');
        });
    }
});

/**
 * 生活服务
 */
myReady(function () {
     
});

/**
 * 综合推荐、天天低价及热门晒单
 */
myReady(function () {
    var oDoc = document,
        i = null;

    // 品质生活及天天低价的图片移动
    var aMoveHover = oDoc.querySelectorAll('.js-hover-move'),
        aMovePic = oDoc.querySelectorAll('.js-img-move'),
        len1 = aMovePic.length;

    for (i = 0; i < len1; i++) {
        aMoveHover[i].index = i;
        hover(aMoveHover[i] , function () {
            move(aMovePic[this.index] , {left : -8});
        } , function () {
            move(aMovePic[this.index] , {left : 0});
        });
    }

    // 猜你喜欢
    var oReplace = oDoc.querySelector('.js-replace'),
        aRepContent = oDoc.querySelectorAll('.js-replace-content');
        len2 = aRepContent.length,
        oGuessLike = oDoc.getElementById('guess-like'),
        oSpacer = oDoc.querySelector('.js-ql-spacer'),
        timer = null;

    myAddEvent(oReplace , 'click' , function () {
        for (i = 0; i < len2; i++) {
            toggleClass(aRepContent[i] , 'is-current');
        }
    });
    hover(oGuessLike , function () {
        timer = setTimeout ( function () {
            oSpacer.style.right = '1210px';
            move (oSpacer , {right : 0} , 15);
        } , 600);
    } , function () {
        clearTimeout(timer);
    });

    // 今日推荐



    // 热门晒单
    var oHsContent = oDoc.querySelector('.js-hs-content');
        oHsLi = oHsContent.getElementsByTagName('li');
        iLast = oHsLi.length - 1;

    setInterval(function () {
        var oRemoveLi = oHsLi[iLast];
        oRemoveLi.style.opacity = 0;
        oRemoveLi.style.height = 0;
        oHsContent.removeChild(oRemoveLi);
        oHsContent.insertBefore(oRemoveLi , oHsLi[0]);
        oHsLi = oHsContent.getElementsByTagName('li');
        move(oHsLi[0] , {height : 100} , 15 , function () {
            move(oHsLi[0] , {opacity : 100} , 40);
        });
    } , 3000);
});

/**
 * 全局工具栏
 */
myReady(function () {
    var i = null,
        oToolbar = document.querySelector('.js-gobal-toolbar'),
        aLi = oToolbar.getElementsByTagName('li'),
        aText = oToolbar.getElementsByTagName('p'),
        aIcon = oToolbar.getElementsByTagName('i'),
        len = aLi.length;

    for (i = 0; i < len; i++) {
        aLi[i].index = i;
        aLi[i].timer = null;

        hover(aLi[i] , function () {
            var that = this;
            clearTimeout(this.timer);
            aIcon[this.index].style.backgroundColor = '#C81623';
            this.timer = setTimeout(function () {
                if (that.index < 5) {
                    move(aText[that.index] , {right : 65} , 15);
                } else{
                    move(aText[that.index] , {right : 45} , 15);
                }
            } , 300);
        } , function () {
            clearTimeout(this.timer);
            aIcon[this.index].style.backgroundColor = '#7a6e6e';
            move(aText[this.index] , {right : 0} , 15);
        });
    }

    myAddEvent(aLi[5] , 'click' , function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    });
});

/**
 * 主要内容
 */