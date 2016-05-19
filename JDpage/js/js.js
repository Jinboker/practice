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
    myAddEvent(obj , 'mouseenter' , fnOver);
    myAddEvent(obj , 'mouseleave' , fnOut);
}

/**
*classHover
* @param   {Object}       obj     需要执行classHover的对象
* @param   {function}     fn      鼠标移入移出时的函数
*/
function classHover(obj , fn) {
    myAddEvent(obj , 'mouseenter' , fn);
    myAddEvent(obj , 'mouseleave' , fn);
}

/**
*delayTrigger
* @param   {function}       fn     需要延迟执行的函数
*/
function delayTrigger(fn , delay) {
    var timer = null;

    return function () {
        var context = this,
            args = arguments;

        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context , args);
        } , delay);
    }
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
            var iSpeed = null,
                iCur = null;

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


/*------------------------------------ 焦点图模块 ----------------------------------------*/
/**
 *Class
 *焦点图函数模块
 */
function MoveFocus(obj) {
    this.aPicLi = obj.querySelectorAll('.js-slider-pic > li');
    this.len = this.aPicLi.length;

    this.entrance.call(this , obj);
}

MoveFocus.prototype = {
    entrance : function (obj) {
        // 自动播放
        this.autoPlay(this , obj);

        //鼠标移入移出时候自动播放的停止跟开始
        this.autoPlayMouseover(this , obj);

        // 按钮显示以及点击切换
        this.btn(this , obj); 

        // nav鼠标移入后的切换
        this.nav(this , obj);
    },

    autoPlayMouseover : function (that , obj) {
        hover(obj , function () {
            clearInterval(that.timer);
        } , function () {
            that.autoPlay(that , obj);
        });    
    },

    autoPlay : function (that , obj) {
        that.timer = null;

        that.timer = setInterval(function () {
            that.togglePic();
        } , 3000);
    },

    togglePic : function () {
        console.log('a');
    },

    btn : function (that , obj) {
        var oBtn = obj.querySelector('.js-slider-btn'),
            oPrev = oBtn.getElementsByTagName('a')[0],
            oNext = oBtn.getElementsByTagName('a')[1];

        // 鼠标移入焦点图区域的时候按钮显示
        classHover(obj , function () {
            toggleClass(oBtn , 'is-hide');
        });

        // 点击按钮图片切换
        myAddEvent(oPrev , 'click' , function () {
            that.togglePic();
        });
        myAddEvent(oNext , 'click' , function () {
            that.togglePic();
        });
    },

    nav : function (that , obj) {
        var aNav = obj.querySelectorAll('.js-slider-nav > li'),
            iNavKey = 0,
            navLen = that.len,
            i = null,
            timer = null;

        for (i = 0; i < navLen; i++) {

            aNav[i].index = i;
            hover(aNav[i] , function () {
                if (this.className != 'is-current') {
                    var _this = this;
                    timer = setTimeout(function () {
                        toggleClass(aNav[iNavKey] , 'is-current');
                        toggleClass(_this , 'is-current');
                        that.togglePic();
                        iNavKey = _this.index;
                    } , 100);
                }
            } , function () {
                clearTimeout(timer);
            });
        }
    }
}

/**
 * 焦点图
 */
myReady(function () {

    // var oRecommendSlider = document.querySelector('.js-recommend-slider');
    // new MoveFocus(oRecommendSlider);


    // var oBigSlider = document.querySelector('.js-big-slider');
    // new MoveFocus(oBigSlider); 


    // 主要内容：
    var oClothesSlider = document.querySelector('.js-clothes-slider');
    new MoveFocus(oClothesSlider);

    var oCosmeticSlider = document.querySelector('.js-cosmetic-slider');
    new MoveFocus(oCosmeticSlider);

    var oMobilesSlider = document.querySelector('.js-mobiles-slider');
    new MoveFocus(oMobilesSlider);

    var oSportsSlider = document.querySelector('.js-sports-slider');
    new MoveFocus(oSportsSlider);
});

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
                    break;
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
 * 生活服务栏隐藏内容里的选项卡及主要内容的选项卡切换
 */
myReady(function () {
    var i = null,
        aTab = document.querySelectorAll('.js-tab'),
        len = aTab.length;

    function tabChange(obj) {
        var i = null,
            aTabTop = obj.querySelectorAll('.js-tab-top > li'),
            aTabContent = obj.querySelectorAll('.js-tab-content'),
            iKey = 0,
            timer = null,
            tabTopLen = aTabTop.length;

        for (i = 0; i < tabTopLen; i++) {
            aTabTop[i].index = i;
            hover(aTabTop[i] , function () {
                var that = this;
                timer = setTimeout(function () {
                    toggleClass(aTabTop[iKey] , 'is-current');
                    toggleClass(that , 'is-current');
                    aTabContent[iKey].style.display = 'none';
                    aTabContent[that.index].style.display = 'block';
                    iKey = that.index;
                } , 50);
            } , function () {
                clearTimeout(timer);
            });
        } 
    }

    for (i = 0; i < len; i++) {
        tabChange(aTab[i]);
    }
});

/**
 * 最大的焦点图及生活服务
 */
myReady(function () {
    var oDoc = document,
        bStop = true,
        timer = null,
        iKey = 0,
        i = null;

    // 鼠标移入后显示
    var oMoveBox = oDoc.querySelector('.js-move-box'),
        aBoxLi = oMoveBox.getElementsByTagName('li'),
        oHideBox = oDoc.querySelector('.js-hide-box'),
        aHideLi = oDoc.querySelectorAll('.js-hide-box > li');

    for (i = 0; i < 4; i++) {
        aBoxLi[i].index = i;
        hover(aBoxLi[i] , function () {
            //bStop在点击关闭后为假，只有在触发aBoxLi[i]上的onmouseout后才会重置为真
            //这样主要是为了防止当鼠标点击关闭后不移动再次触发aBoxLi[i]上的鼠标移入事件
            if (bStop) {
                var that = this,
                    iPosition1 = getStyle(oMoveBox , 'top'),
                    iPosition2 = getStyle(oHideBox , 'top');

                timer = setTimeout(function () {
                    // iPosition1 === '-39px'表明隐藏块已经运动到顶部了，因此onmouseover触发的是选项卡切换
                    if (iPosition1 === '-39px') {
                        toggleClass(aBoxLi[iKey] , 'is-current');
                        toggleClass(that , 'is-current');
                        aHideLi[iKey].style.display = 'none';
                        aHideLi[that.index].style.display = 'block';
                        iKey = that.index;
                    }
                    // iPosition2 === '208px'表明隐藏块没有开始运动，因此onmouseover触发的是隐藏的块运动出现
                    if (iPosition2 === '208px') {
                        aHideLi[that.index].style.display = 'block';
                        move(oHideBox , {top : 70} , 5 , function() {
                            move(oMoveBox , {top : -39} , 5 , function () {
                                toggleClass(that , 'is-current');
                                iKey = that.index;
                            });
                        });
                    }
                } , 100);                
            }
        } , function () {
            clearTimeout(timer);
            // 点击关闭后bStop为假，mouseover事件不会触发，必须触发一次mouseout事件后才会为真
            (!bStop)&&(bStop = true);            
        });
    }

    // 点击关闭后隐藏
    var aClose = oDoc.querySelectorAll('.js-close'),
        iCloseLen = aClose.length;

    for (i = 0; i < iCloseLen; i++) {
        aClose[i].index = i;
        myAddEvent(aClose[i] , 'click' , function () {
            //点击关闭后bStop为假并且隐藏内容运动回隐藏
            bStop = false;
            var that = this;
            toggleClass(aBoxLi[iKey] , 'is-current');
            move(oMoveBox , {top : 0} , 4 , function () {
                move(oHideBox , {top : 208} , 5 , function () {
                    aHideLi[that.index].style.display = 'none';
                });
            });
        });
    }

    // 机票往返的btn点击后返程票的selected选项显示
    var aGoBackBtn = oDoc.querySelectorAll('.js-go-back-btn'),
        aTicketBack = oDoc.querySelectorAll('.js-ticket-back'),
        len = aGoBackBtn.length;
    
    for (i = 0; i < len; i++) {
        aGoBackBtn[i].index = i;
        myAddEvent(aGoBackBtn[i] , 'click' , function () {
            toggleClass(aTicketBack[this.index] , 'hide');
        });
    }
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

    // 猜你喜欢部分的点击换一批更换内容，同时有鼠标移入后的一个横向的小条的运动
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

    // 热门晒单的自动播放
    
});

/**
 * 全局工具栏
 */
myReady(function () {
    var i = null,
        oDoc = document,
        oToolbar = oDoc.querySelector('.js-gobal-toolbar'),
        aLi = oToolbar.getElementsByTagName('li'),
        aText = oToolbar.getElementsByTagName('p'),
        aIcon = oToolbar.getElementsByTagName('i'),
        len = aLi.length;

    // 鼠标移入移出的运动
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

    // 回到顶部
    myAddEvent(aLi[5] , 'click' , function () {
        oDoc.documentElement.scrollTop = oDoc.body.scrollTop = 0;
    });
});
 
/**
 * 楼层索引相关
 */
 myReady(function () {
    var i = null,
        iKey = null,
        oDoc = document;

    // 页面放大缩小时候全局索引栏的重新定位（包括页面放大缩小后刷新页面的重新定位）
    var oElevator = oDoc.getElementById('elevator');

    function elevatorPosition() {
        oElevator.style.left = parseInt((oDoc.body.clientWidth - 1280)/2) + 'px';
    }
  
    elevatorPosition();
    window.onresize = delayTrigger(elevatorPosition , 100);

    // 页面滚动时楼层索引及每层内容的楼层指示的变化
    var oElevator = oDoc.getElementById('elevator'),
        aElevatorTitle = oDoc.querySelectorAll('.js-elevator'),
        aFloor = oDoc.querySelectorAll('.js-bg-hide'),
        len = aElevatorTitle.length;

    function floorJudge() {
        var iScrollTop = oDoc.documentElement.scrollTop || oDoc.body.scrollTop;
        if (iScrollTop <= 2902) {
            if (iScrollTop <= 815) {
               fna();
            }else if (iScrollTop <= 2131) {
                (iKey !== 1) && fnb(1);
            } else {
                 (iKey !== 2) && fnb(2);
            }
        } else {
            if (iScrollTop <= 3519) {
                (iKey !== 3) && fnb(3);
            }else if (iScrollTop <= 4535) {
                 (iKey !== 4) && fnb(4);
            } else {
                fna();
            }
        }
    }
    function fna() {
       oElevator.style.display = 'none';
       if (iKey) {
            removeClass(aElevatorTitle[iKey - 1] , 'is-current');
            aFloor[iKey - 1].style.top = '-27px';
       }
       iKey = null;
    }
    function fnb(iNum) {
        var num1 = iKey - 1,
            num2 = iNum - 1;

        oElevator.style.display = 'block';
        if (iKey) {
            removeClass(aElevatorTitle[num1] , 'is-current');
            aFloor[num1].style.top = '-27px';
        }
        addClass(aElevatorTitle[num2] , 'is-current');
        move(aFloor[num2] , {top : 0});
        iKey = iNum;
    }

    floorJudge();
    oDoc.onscroll = delayTrigger(floorJudge , 100);

    // 点击后运动至相应的楼层
    var aSubMain = oDoc.querySelectorAll('.js-content-top'),
        iSubMainLen = aSubMain.length,
        iScrollTop = null;

    for (i = 0; i < len; i++) {
        aElevatorTitle[i].index = i;
        myAddEvent(aElevatorTitle[i] , 'click' , function () {
            oDoc.documentElement.scrollTop = oDoc.body.scrollTop = oDoc.documentElement.scrollTop || oDoc.body.scrollTop + aSubMain[this.index].getBoundingClientRect().top;
        });
    }
 });