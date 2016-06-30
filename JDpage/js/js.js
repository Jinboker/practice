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
 * DomReady,在文档创建时,就访问dom元素.比window.onload要快很多.绑定需要执行的函数.
 * @param  {Function}     fn     需要执行的函数
 * @return {执行}                在dom节点创建时,同时执行,window.onload等到节点全部创建完毕才执行
 */
// function myReady(fn) {
//     //对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
//     if (document.addEventListener) {
//         document.addEventListener("DOMContentLoaded", fn, false);
//     } else {
//         IEContentLoaded(fn);
//     }

//     //IE模拟DOMContentLoaded
//     function IEContentLoaded(fn) {
//         var d = window.document;
//         var done = false;

//         //只执行一次用户的回调函数init();
//         var init = function () {
//             if (!done) {
//                 done = true;
//                 fn();
//             }
//         };
//         (function () {
//             try {
//                 // DOM树未创建完之前调用doScroll会抛出错误
//                 d.documentElement.doScroll('left');
//             } catch (e) {
//                 //延迟再试一次~
//                 setTimeout(arguments.callee, 50);
//                 return;
//             }
//             // 没有错误就表示DOM树创建完毕，然后立马执行用户回调
//             init();
//         })();

//         //监听document的加载状态
//         d.onreadystatechange = function () {
//             // 如果用户是在domReady之后绑定的函数，就立马执行
//             if (d.readyState === 'complete') {
//                 d.onreadystatechange = null;
//                 init();
//             }
//         };
//     }
// }

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
 * 清除掉一个nodeList对象中含有sClass这个class值的某个对象上的sClass
 * 注：该nodeList对象中的值最多只能含有想要被清除的class
 * @param   {Object}     nodeList     一个nodeList对象
 * @param   {number}     len          这个nodeList对象的长度
 * @param   {string}     sClass       想要清除的class名
 */
function clearClass(nodeList , len , sClass) {
    for (var i = 0; i < len; i++) {
        if (nodeList[i].className === sClass) {
            toggleClass(nodeList[i] , sClass);
            break;
        }
    }
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
*classHover，主要是有一些hover函数移入移出执行的都是相同的操作：添加或去掉同一个class，因此简化一下
* @param   {Object}       obj     需要执行classHover的对象
* @param   {function}     fn      鼠标移入移出时的函数
*/
function classHover(obj , fn) {
    myAddEvent(obj , 'mouseenter' , fn);
    myAddEvent(obj , 'mouseleave' , fn);
}

/**
*函数节流
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
 * prototype继承函数
 * @param {object}      parent        父类
 * @param {object}      child         子类
 */
function extend(child , parent) {
    var p = parent.prototype,
        c = child.prototype;

    for (var i in p) {
        c[i] = p[i];
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
/**Class
 *图片横移焦点图函数模块
 *@param {object}    obj         焦点图对象
 */
function MoveFocus(obj) {
    // 只有图片相关的属性定义在了构造函数中，其他诸如btn , nav之类的属性都定义在了相关的方法中
    // 主要是方便其他不含有btn , nav的焦点图对模块进行改写
    this.obj = obj;
    this.oPic = obj.querySelector('.js-slider-pic');
    this.aPicLi = this.oPic.getElementsByTagName('li');
    this.len = this.aPicLi.length;
    this.key = 0;
}

MoveFocus.prototype = {
    entrance : function (obj) {
        // 初始化
        this.init();
        // 自动播放
        this.autoPlay();
        //鼠标移入移出时候自动播放的停止跟开始
        this.autoPlayHover();
        // 按钮显示及点击切换
        this.btn();
        // nav鼠标移入后的切换
        this.nav();
    },

    init : function () {
        // 默认开启自动轮播
        this.obj.bStop = true;
        // 将图片复制一遍后，图片运动至头尾时通过改变图片的位置形成无缝滚动
        var innerPic = this.oPic,
            html = innerPic.innerHTML;

        this.width = this.aPicLi[0].offsetWidth;
        innerPic.style.left = -this.width + 'px';
        innerPic.style.width = this.width*(this.len+2) + 100 + 'px';  
        // 将第一张图及最后一张图分别复制到这一串图的尾部跟头部，用来做无缝滚动（简单方式是直接将innerHTML自身赋值一遍就行）
        innerPic.innerHTML = this.aPicLi[this.len-1].outerHTML + innerPic.innerHTML + this.aPicLi[0].outerHTML;
    },

    autoPlayHover : function () {
        var that = this;
        hover(this.obj , function () {
            clearInterval(that.timer);
        } , function () {
            that.autoPlay();
        });    
    },

    autoPlay : function () {
        var that = this;
        this.timer = null;
        this.timer = setInterval(function () {
            // 假如that.obj.bStop为假，则关闭自动播放
            that.obj.bStop && that.next();
        } , 3000);
    },

    btn : function () {
        var oBtn = this.obj.querySelector('.js-slider-btn'),
            oPrev = oBtn.getElementsByTagName('a')[0],
            oNext = oBtn.getElementsByTagName('a')[1],
            that = this;

        this.moveAble = true;
        // 鼠标移入焦点图区域的时候按钮显示
        classHover(this.obj , function () {
            toggleClass(oBtn , 'is-hide');
        });
        // 点击切换图片
        myAddEvent(oPrev , 'click' , function () {
            // that.moveAble在图片运动时会被设置为假，只有运动结束后才会被设置为真，这是为了防止用户短时间内多次点击按钮触发运动
            that.moveAble && that.prev();
        });
        myAddEvent(oNext , 'click' , function () {
            that.moveAble && that.next();
        });
    },

    prev : function () {
        // 当key值等于0 的时候就表示运动到头了，需要切换位置
        if (this.key > 0) {
            this.key --;
        } else {
            this.key = (this.len-1);
            this.oPic.style.left = -this.width*(this.len + 1) + 'px';
        }
        this.change();
    },

    next : function () {
        // 当key值等于that.len-1的时候表明运动到尾了，同样需要切换位置
        if (this.key < (this.len-1)) {
            this.key ++;
        } else {
            this.key = 0;
            this.oPic.style.left = 0;
        }
        this.change();
    },

    nav : function () {
        var navLen = this.len,
            i = null,
            that = this,
            timer = null;

        this.aNav = this.obj.querySelectorAll('.js-slider-nav > li');

        for (i = 0; i < navLen; i++) {
            this.aNav[i].index = i;
            // 鼠标划过nav后改变图片及本身的样式，设置定时主要是为了防止鼠标快速划过时也触发了onmouseenter
            hover(this.aNav[i] , function () {
                if (this.className != 'is-current') {
                    var _this = this;
                    
                    timer = setTimeout(function () {
                        that.key = _this.index;
                        that.change(_this);
                    } , 100);
                }
            } , function () {
                clearTimeout(timer);
            });
        }
    },

    change : function () {
        // 有部分轮播图没有nav，因此检查一下是否含有nav再执行下面的代码
        if (!!this.aNav) {
            clearClass(this.aNav , this.len , 'is-current');
            toggleClass(this.aNav[this.key] , 'is-current');
        }
        var that = this,
            iLeft = -this.key * this.width - this.width;

        this.moveAble = false;
        move(this.oPic , {left : iLeft} , 16 , function () {
            that.moveAble = true;
        });
    }
}

/**Class
 *热门晒单的自动播放
 *@param {object}    obj     焦点图对象
 */
function HotSheet(obj) {
    MoveFocus.call(this , obj);
}
extend (HotSheet , MoveFocus);

HotSheet.prototype.init = function () {
    this.obj.bStop = true;
    this.height = this.aPicLi[0].offsetHeight;

    var innerPic = this.oPic,
        html = innerPic.innerHTML;

    innerPic.innerHTML += innerPic.innerHTML
    innerPic.style.bottom = 0;
};

HotSheet.prototype.next = function() {
    if (this.key > 0) {
        this.key --;
    } else {
        this.key = (this.len-1);
        this.oPic.style.bottom = this.height * this.len + 'px';
    }
    this.change();
};

HotSheet.prototype.change = function() {
    var iBottom = (this.key- this.len) * this.height + this.height * this.len;
    move(this.oPic , {bottom : iBottom} , 16);
};

/**Class
 *图片透明度改变的焦点图函数模块
 *@param {object}    obj         焦点图对象
 */
function OpacityMove(obj) {
    MoveFocus.call(this , obj);
}
extend (OpacityMove , MoveFocus);

OpacityMove.prototype.init = function () {
    // 默认开启自动轮播
    this.obj.bStop = true;
    // 初始化
    removeClass(this.aPicLi[0] , 'is-js-delete');
    this.aPicLi[0].style.opacity = 1;
    this.aPicLi[0].filter = 'alpha(opacity:'+ 100 +')';
};

OpacityMove.prototype.prev = function () {
    // 当key值等于0 的时候就表示运动到头了，需要切换
    this.key > 0 ? this.key -- : this.key = (this.len-1);
    this.change();
};

OpacityMove.prototype.next = function () {
    // 当key值等于that.len-1的时候表明运动到尾了，同样需要切换
    this.key < ((this.len-1)) ? this.key ++ : this.key = 0;
    this.change();
};

OpacityMove.prototype.change = function () {
    var that = this;

    for (var i = 0; i < this.len; i++) {
        if (this.aNav[i].className === 'is-current') {
            toggleClass(this.aNav[i] , 'is-current');
            move(this.aPicLi[i] , {opacity : 0});
            break;
        }
    }
    this.moveAble = false;
    toggleClass(this.aNav[this.key] , 'is-current');
    move(this.aPicLi[this.key] , {opacity : 100} , 16 , function () {
        that.moveAble = true;
    });
};

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

    // 事件委托，获取点击选择的省份
    myAddEvent(oChooseAddr , 'click' , function (ev) {
        ev = ev || window.event;

        var target = ev.target || ev.srcElement;

        if (target.nodeName.toLowerCase() === 'a') {
            clearClass(aLi , iLiLen , 'is-choose');
            target.className = 'is-choose';
            oVisibleAddr.innerHTML = target.innerHTML;
        }
    });

    // 详细商品栏的显示隐藏
    var aCategoryVisible = oDoc.querySelectorAll('.js-category > li'),
        aCategoryHide = oDoc.querySelectorAll('.js-category > .js-hide-category'),
        iCategoryLen = aCategoryVisible.length;

    /**
     * @param  {object}     obj1    当前想要添加is-current的对象
     * @param  {object}     obj2    另外一个想要添加is-current的对象
     * @param  {unmber}     key     索引值
     */
    function categoryShowHide(obj1 , obj2 , key) {
        obj1.index = key;

        classHover(obj1 , function () {
            toggleClass(this , 'is-current');
            toggleClass(obj2[this.index] , 'is-current');
        });
    }

    for (i = 0; i < iCategoryLen; i++) {
        categoryShowHide(aCategoryVisible[i] , aCategoryHide , i);
        categoryShowHide(aCategoryHide[i] , aCategoryVisible , i);
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
                    // 将之前class为is-current的那个对象的class设置为空，再将hover的这个对象class设置为is-current
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
 * 详细商品栏右边的焦点图及生活服务
 */
myReady(function () {
    var oDoc = document,
        bStop = true,
        timer = null,
        iKey = 0,
        i = null;

    // 焦点图
    var slider = new OpacityMove(oDoc.querySelector('.js-big-slider')); 
    slider.entrance();

    // 生活服务鼠标移入后显示
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

                // 这里开一个定时器主要是为了防止鼠标快速划过时触发事件
                timer = setTimeout(function () {
                    // iPosition1 === '-39px'表明隐藏块已经运动到顶部了，因此mouseenter触发的是选项卡切换
                    if (iPosition1 === '-39px') {
                        toggleClass(aBoxLi[iKey] , 'is-current');
                        toggleClass(that , 'is-current');
                        aHideLi[iKey].style.display = 'none';
                        aHideLi[that.index].style.display = 'block';
                        iKey = that.index;
                    }
                    // iPosition2 === '208px'表明隐藏块没有开始运动，因此mouseenter触发的是隐藏的块运动出现
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
            // 点击关闭后bStop为假，mouseenter事件不会触发，必须触发一次mouseleave事件后才会为真
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

    // 今日推荐的轮播
    var slider = new MoveFocus(oDoc.querySelector('.js-recommend-slider'));

    slider.init();
    slider.btn();

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

    //热门晒单的自动播放
    var hsSlider = new HotSheet(oDoc.querySelector('.js-hot-sheet-slider')); 

    hsSlider.init();
    hsSlider.autoPlay();
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
                //工具栏上面的五个工具隐藏的部分要比下面2个宽20px，因此要分开进行运动
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
        oDoc = document;

    // 页面放大缩小时候全局索引栏的重新定位（包括页面放大缩小后刷新页面的重新定位）
    var oElevator = oDoc.getElementById('elevator');

    /**
     * 给楼层索引所在的位置进行重新定位
     */
    function elevatorPosition() {
        oElevator.style.left = parseInt((oDoc.body.clientWidth - 1280)/2) + 'px';
    }
  
    elevatorPosition();
    window.onresize = delayTrigger(elevatorPosition , 100);

    // 页面滚动时楼层索引及每层内容的楼层指示的变化，内容里的焦点图开始运动
    var oElevator = oDoc.getElementById('elevator'),
        aElevatorTitle = oDoc.querySelectorAll('.js-elevator'),
        aFloor = oDoc.querySelectorAll('.js-bg-hide'),
        len = aElevatorTitle.length,
        aContentSlider = oDoc.querySelectorAll('.js-content-slider'),
        timer = null,
        iKey = null;

    /**
     * 判断到达的楼层，执行该楼层所对应的操作
     */
    function floorJudge() {
        var iScrollTop = oDoc.documentElement.scrollTop || oDoc.body.scrollTop;
        if (iScrollTop <= 2777) {
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
    /**
     * 当显示的范围不是每层楼主要内容的区域的时候，执行的操作
     */
    function fna() {
       oElevator.style.display = 'none';
       if (iKey) {
            removeClass(aElevatorTitle[iKey - 1] , 'is-current');
            aFloor[iKey - 1].style.top = '-27px';
            // 关闭轮播图的自动轮播
            aContentSlider[iKey - 1].bStop = false;
       }
       iKey = null;
    }
    /**
     * 当显示的范围正好是每层楼的主要内容区域的时候，执行的操作
     * @param  {number}    iNum    楼层数
     */
    function fnb(iNum) {
        // iKey的值为上一次所在的楼层数
        var num1 = iKey - 1,
            num2 = iNum - 1;

        oElevator.style.display = 'block';
        // 如果iKey为假，那么表示上一次屏幕的显示范围不是在主要内容区域，直接执行楼层相应的操作就行
        if (iKey) {
            // 移除上一次所在的楼层的响应操作
            removeClass(aElevatorTitle[num1] , 'is-current');
            aFloor[num1].style.top = '-27px';
            aContentSlider[num1].bStop = false;
        }
        // 内容头部的楼层指示
        addClass(aElevatorTitle[num2] , 'is-current');
        move(aFloor[num2] , {top : 0});
        // 开启对应楼层的自动轮播
        aContentSlider[num2].bStop = true;
        iKey = iNum;
    }

    // 主要内容里面添加轮播图
    var aSlider = [];
    for (i = 0; i < len; i++) {
        aSlider[i] = new MoveFocus(aContentSlider[i]);
        aSlider[i].entrance(aContentSlider[i]);
        // 统一关闭所有的自动轮播，只有页面在相应的楼层显示的时候才会将这个值设置为true，即开启自动轮播
        aContentSlider[i].bStop = false;
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