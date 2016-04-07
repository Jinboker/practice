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
 * etElementById的简写；
 * @param {string} sId 想要获取的元素的id；
 */
function id (sId) {
    return document.getElementById(sId);
}

/**
 *获取实际样式函数
 * @param   {Object} obj  需要获取样式的对象
 * @param   {String} attr 获取的样式名
 * @returns {String} 获取到的样式值
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
 *根据父元素获取class
 *@param ｛object｝oParent 想要获取的class的父元素对象
 *@param ｛string｝sClass  想要获取的class的class值
 */
function getClass (oParent,sClass) {
    var aResult = [];
    var re = new RegExp('\\b'+sClass+'\\b','i');

    if (oParent.getElementsByClassName) {
        return  oParent.getElementsByClassName(sClass);
    } else{
        var aElem = oParent.getElementsByTagName('*');
        for (var i = 0; i < aElem.length; i++) {
            if (re.test(aElem[i].className)) {
                aResult.push(aElem[i]);
            }
        }
    }
    return aResult;
}

/**
 * 获取元素子节点函数（因为childNodes有些浏览器会获取\n）
 * @param {object}   oParent 想要获取的子节点的父节点
 */
function getChild(oParent) {
    var aResult = [];
    var aChild = oParent.childNodes;
    for (var i = 0; i < aChild.length; i++) {
        if (aChild[i].nodeType === 1) {
            aResult.push(aChild[i]);
        }
    }
    return aResult;
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
                //阻止事件冒泡及默认行为
                ev.cancelBubble = true;
                ev.preventDefault();
            }
        }, false);
    } else if (obj.attachEvent) {
        //IE
        obj.attachEvent("on" + type, function () {
            //修改ie下this指向window的问题
            if (false === fn.call(obj)) {
                //阻止事件冒泡及默认行为
                event.cancelBubble = true;
                return false;
            }
        });
    } else {
        //最后选择
        obj["on" + type] = fn;
    }
}

/**
 * 显示隐藏函数,如果是显示就隐藏,是隐藏就显示
 * @param {object} obj 需要在点击或hover后实现点击显示隐藏.的对象
 */
function showHide(obj) {
    var objDisplay = getStyle(obj, "display");
    if (objDisplay == "none") {
        obj.style.display = "block";
    } else {
        obj.style.display = "none";

    }
}

/**
 * 任意值的缓冲运动框架
 * @param {object}   oEle         想要运动的那个对象
 * @param {json}     json         运动的目标
 * @param {number}   iCtrSpeed    可选，用来控制运动速度，默认为25
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
            // 获取透明度IE8以前的写法
            if (attr == 'opacity') {
                iCur = parseInt( parseFloat(getStyle(oEle , attr))*100 );
            // 标准写法
            } else{
                iCur = parseInt(getStyle(oEle , attr));
            }
            // 缓冲运动速度值
            iSpeed = (json[attr] - iCur)/8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            // 检测是否运动到目标，如果没有继续运动
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr == 'opacity') {
                oEle.style.opacity = (iCur + iSpeed)/100;
                oEle.style.filter = 'alpha(opacity:'+ (iCur + iSpeed) +')';
            } else{
                oEle.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bStop) {
            clearInterval(oEle.timer);
            // fn && fn();
            if (fn) {
                fn();
            }
        }
    },iCtrSpeed);
}
/*--------------------------------- 工具包函数结束 -------------------------------------*/


/*--------------------------------- 焦点图函数开始 -------------------------------------*/
/**
 * 焦点图函数（注：HTML跟CSS必须按照相应的规则来写）
 * @param {object} oEle    焦点图的主体元素
 * @param {bool} boole     ture代表按照淡入淡出来切换图片，false代表横向移动切换图片
 */
function Focus( oEle , boole ) {
    this.initialize.apply(this , arguments);
}
Focus.prototype =
{
    initialize : function ( oEle , boole )
    {
        var that = this;
        this.timer = null;
        this.navTimer = null;
        this.btnTimer = null;
        this.stop = true;
        this.iNow = 1;
        this.oFocus = id(oEle);
        this.oFocusChild = getChild(this.oFocus);
        // 获取图片
        this.aSliderImg = this.oFocusChild[0].getElementsByTagName('li');
        // 获取nav
        this.aSliderNav = this.oFocusChild[1].getElementsByTagName('li');
        // 获取按钮
        this.oSliderBtn = this.oFocusChild[2];
        this.prevBtn = this.oSliderBtn.getElementsByTagName('a')[0];
        this.nextBtn = this.oSliderBtn.getElementsByTagName('a')[1];
        // 详细商品栏右边的焦点图初始化
        if (boole) {
            this.aSliderImg[0].style.opacity = 1;
            this.aSliderImg[0].style.filter = 'alpha(opacity:100)';
        }
        // 开启自动播放
        this.autoPlay.apply(this);
        // 鼠标移入后自动播放暂停
        myAddEvent (this.oFocus , 'mouseover' ,function () {
            clearInterval(that.timer);
        });
        // 鼠标移出后开始自动播放
        myAddEvent (this.oFocus , 'mouseout' ,function () {
            that.autoPlay.apply(that);
        });
        // 鼠标移入移出时按钮的显示与隐藏
        this.showHideBtn.apply(this);
        // 前后按钮点击时候图片的轮换
        myAddEvent (this.prevBtn , 'click' , function () {
            if (that.stop) {
                that.stop = false;
                that.iNow > 1 ? that.iNow -- : that.iNow = (that.aSliderImg.length-1);
                that.opacityMove.apply(that);
                that.btnTimer = setTimeout( function () {
                    that.stop = true;
                } ,500);
            }
        });
        myAddEvent (this.nextBtn , 'click' , function () {
            if (that.stop) {
                that.stop = false;
                that.iNow < (that.aSliderImg.length-1) ? that.iNow ++ : that.iNow = 0;
                that.opacityMove.apply(that);
                that.btnTimer = setTimeout( function () {
                    that.stop = true;
                } ,500);
            }
        });
        // 鼠标移入nav的时候图片切换
        this.navChange.apply(this);
    },

    // 按钮的显示与隐藏
    showHideBtn : function ()
    {
        var that = this;
        for (var i = 0; i < this.aSliderImg.length; i++) {
            this.oSliderBtn.onmouseover = this.aSliderImg[i].onmouseover = function  () {
                showHide(that.oSliderBtn);
            };
            this.oSliderBtn.onmouseout = this.aSliderImg[i].onmouseout = function  () {
                showHide(that.oSliderBtn);
            };
        }
    },

    // 自动播放
    autoPlay : function ()
    {
        var that = this;
        this.timer = setInterval( function () {
            that.opacityMove.apply(that);
            that.iNow < (that.aSliderImg.length-1) ? that.iNow ++ : that.iNow = 0;
        } , 3500);
    },

    // 鼠标移入nav图片切换
    navChange : function ()
    {
        var that = this;
        for (var i = 0; i < this.aSliderNav.length; i++) {
            this.aSliderNav[i].index = i;
            myAddEvent (this.aSliderNav[i] , 'mouseover' , function () {
                if(this.className != 'currentSlider'){       //不要全部都是that啊，这里用this的
                    var _this = this;
                    that.navTimer = setTimeout( function () {
                        that.iNow = _this.index;
                        that.opacityMove.apply(that);
                    } , 300);
                }
            });
            myAddEvent ( this.aSliderNav[i] , 'mouseout' , function () {
                clearTimeout(that.navTimer);
            } );
        }
    },

    // 图片的隐藏与显示
    opacityMove : function ()
    {
        for (var i = 0; i < this.aSliderImg.length; i++) {
            // 将当前正在显示的图片变为隐藏
            if (this.aSliderImg[i].className == 'currentSlider') {
                this.aSliderImg[i].className = this.aSliderNav[i].className = null;
                move(this.aSliderImg[i] , {
                    opacity: 0
                });
            }
        }
        // 将索引值为iNow的图片显示出来
        this.aSliderImg[this.iNow].className = this.aSliderNav[this.iNow].className = 'currentSlider';
        move (this.aSliderImg[this.iNow] , {
            opacity: 100
        });
    }
};
/*--------------------------------- 焦点图函数结束 -------------------------------------*/


/*---------------------------------- 页面流程开始 --------------------------------------*/
/**
 * top栏及购物车的隐藏
 */
myReady(function () {
    var i = null;
    // top栏部分
    var oTop = id('top');
    var aTopDropdown = getClass(oTop,'top_dropdown');
    var aDropLayer = getClass(oTop,'drop_layer');
    var aTopBlock = getClass(oTop,'block');
    //top栏鼠标移入移出时相应的隐藏显示与背景改变
    for (i = 0; i < aTopDropdown.length; i++) {
        aTopDropdown[i].index = i;

        myAddEvent(aTopDropdown[i] , 'mouseover' , function () {
            this.className = 'top_dropdownchange top_bar';
            showHide(aTopBlock[this.index]);
            showHide(aDropLayer[this.index]);
        });

        myAddEvent(aTopDropdown[i] , 'mouseout' , function () {
            this.className = 'top_dropdown top_bar';
            showHide(aTopBlock[this.index]);
            showHide(aDropLayer[this.index]);
        });
    }
    // top栏左侧的地址选择
    var oTopAddr = id('top_addr');
    var aAddr = id('addr').getElementsByTagName('a');

    for (i = 0; i < aAddr.length; i++) {
        // 隐藏的地址鼠标移入后背景颜色与字体颜色改变
        myAddEvent(aAddr[i] , 'mouseover' , function () {
            this.className = "adder_change";
        });
        myAddEvent(aAddr[i] , 'mouseout' , function () {
            this.className = null;
        });
        // 点击地址时候top栏切换
        myAddEvent(aAddr[i] , 'click' , function () {
            if ( this.style.backgroundColor != '#c81623' ) {
                for (var i = 0; i < aAddr.length; i++) {
                    aAddr[i].style.backgroundColor = null;
                    aAddr[i].style.color = null;
                }
                this.style.backgroundColor = '#c81623';
                this.style.color = 'white';
                oTopAddr.innerHTML = this.innerHTML;
            }
        });
    }

    //购物车部分
    var obuyCar = id('buyCar');
    var oHideBuyCar = id('hideBuyCar');
    var aBuyCarBlock = getClass(obuyCar,'block');
    // 鼠标移入移出的隐藏显示
    oHideBuyCar.onmouseover = obuyCar.onmouseover = function  () {
        showHide(aBuyCarBlock[0]);
        showHide(oHideBuyCar);
        obuyCar.className = 'fr hidebuyCarClass';
    };
    oHideBuyCar.onmouseout = obuyCar.onmouseout = function  () {
        showHide(aBuyCarBlock[0]);
        showHide(oHideBuyCar);
        obuyCar.className = 'fr buyCar1';
    };
});
/* top栏及购物车的隐藏函数结束 */

/**
 * 详细商品栏的显示与隐藏
 */
myReady(function () {
    var i = null;
    var oCategory = id('category');
    var aVisbleCategory = oCategory.getElementsByTagName('li');
    var oHideMenu = id('hidemenu');
    var aHideLayers = getClass(oHideMenu , 'hide_layers');
    var timer1 = null;

    for (i = 0; i < aVisbleCategory.length; i++) {
        aVisbleCategory[i].index = i;
        aHideLayers[i].index = i;

        myAddEvent(aVisbleCategory[i] , 'mouseover' , function () {
            for (var i = 0; i < aVisbleCategory.length; i++) {
                if (aVisbleCategory[i].backgroundColor === '#f7f7f7') {
                    aVisbleCategory[i].className = null;
                }
            }
            this.className = 'unvisble_category';
            aHideLayers[this.index].style.display = 'block';
        });
        myAddEvent(aVisbleCategory[i] , 'mouseout' , function () {
            this.className = null;
            aHideLayers[this.index].style.display = 'none';
        });

        myAddEvent(aHideLayers[i] , 'mouseover' , function () {
            this.style.display = 'block';
            aVisbleCategory[this.index].className = 'unvisble_category';
        });
        myAddEvent(aHideLayers[i] , 'mouseout' , function () {
            this.style.display = 'none';
            aVisbleCategory[this.index].className = 'visble_category';
        });
    }
});
/* 详细商品栏的显示与隐藏结束 */

/**
 * 详细商品栏右边的焦点图
 */
myReady(function () {
    new Focus ('FocusPic1' , true);
});
/**
 * 详细商品栏右边的生活服务
 */
myReady(function () {
    /**
    * 内部函数，使隐藏着的块显示
    * @param {object｝ obj  就是话费、机票、电影票和游戏这四个对象中的一个
    */
    function lifeServerMove(obj) {
        var iPosition1 = getStyle(oLsHide , 'top');
        var iPosition2 = getStyle(oLifeServer , 'top');
        // 如果是点击×关闭后，隐藏模块会运动到209px，此时进行判断，如果为真，那么重置top值后开始运动
        if (iPosition1 === '209px') {
            oLsHide.style.top = '208px';
            iPosition1 = '208px';
        }
        // 判断是否有过运动，如果没有则开始运动
        if (iPosition1 === '208px') {
            showHide(aMoveBottom[obj.index]);
            // 将隐藏的box从隐藏处运动出来
            move (oLsHide , {
                top : 70
            } , 5 , function () {
                // 将生活服务图标的box整体向上运动39px，因为隐藏的box是相对这个定位的，所以也会跟着向上运动
                move(oLifeServer , {
                    top : -39
                } , 5 ,function () {
                    // 运动完成之后出现红色的border
                    obj.className = 'lsh_border';
                });
            });  
        }
        // 判断运动是否已经完成
        if (iPosition2 === '-39px') {
            // 改变相应的选项卡
            if (obj.className != 'lsh_border') {
                for (var i = 0; i < 4; i++) {
                    if (aMoveTop[i].className === 'lsh_border') {
                        aMoveTop[i].className = null;
                        aMoveBottom[i].style.display = 'none';
                    }
                }
                obj.className = 'lsh_border';
                aMoveBottom[obj.index].style.display = 'block';
            }
        }    
    }
    /*---------------------------内部函数结束----------------------------*/

    var i = null;
    // 取话费机票电影票四个li
    var oLifeServer = id('life_server');
    var aMoveTop = oLifeServer.getElementsByTagName('li');
    // 取话费机票电影票四个隐藏着的li
    var oLsHide = id('ls_hide');
    var aMoveBottom = oLsHide.getElementsByTagName('li');
    var timer = null;
    // 隐藏着的块出现
    for (i = 0; i < 4; i++) {
        aMoveTop[i].index = i;
        aMoveTop[i].onmouseover = function () {
            var that = this;
            timer = setTimeout(function () {
                lifeServerMove(that);
            }  , 50);
        };
        aMoveTop[i].onmouseout = function () {
            clearTimeout(timer);
        };
    } 
    // 关闭按钮鼠标移入移出时候的颜色及背景变化
    var aClose = oLsHide.getElementsByTagName('p');
    for (i = 0; i < aClose.length; i++) {
        myAddEvent(aClose[i] , 'mouseover' , function () {
            this.className = 'close change';
        });
        myAddEvent(aClose[i] , 'mouseout' , function () {
            this.className = 'close';
        });
    }
    // 隐藏着的块回到隐藏状态
    for (i = 0; i < aClose.length; i++) {
        aClose[i].index = i;
        myAddEvent(aClose[i] , 'click' , function () {
            var that = this;
            aMoveTop[this.index].className = null;
            move(oLifeServer , {
                top : 0
            } , 5 ,function () {
                move (oLsHide , {
                    // 为了避免点击×以后鼠标不动会再次触发运动，因此多运动1px
                    top : 209
                } , 5 , function () {
                    showHide(aMoveBottom[that.index]);
                });
            });
        });
    }
});

/**
 * 右边工具栏显示与隐藏
 */
myReady(function () {
    var oToolbar = id('gobal-toolbar');
    var aLi = oToolbar.getElementsByTagName('li');
    var aText = oToolbar.getElementsByTagName('p');
    var aIcon = oToolbar.getElementsByTagName('i');

    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].timer = null;

        myAddEvent(aLi[i] , 'mouseover' , function () {
            clearTimeout(this.timer);
            var that = this;
            aIcon[this.index].style.backgroundColor = '#C81623';
            this.timer = setTimeout(function  () {
                //工具栏上面的五个隐藏着的工具要比下面五个宽20px；
                if (that.index < 5) {
                    move(aText[that.index] , {
                        right : 65
                    });
                } else{
                    move(aText[that.index] , {
                        right : 45
                    });
                }
            },200);
        });
        myAddEvent(aLi[i] , 'mouseout' , function () {
            clearTimeout(this.timer);
            aIcon[this.index].style.backgroundColor = '#7a6e6e';
            move(aText[this.index] , {
                right : 0
            });
        });
    }
});
/* 右边工具栏显示与隐藏结束 */

/**
 * 综合推荐
 */
myReady(function () {
    // 今日推荐
    var oRecommend = id('recommend');
    var oGoodsRem = getClass(oRecommend , 'goods_recommend')[0];
    var aUl = oRecommend.getElementsByTagName('ul');
    var aLi = oRecommend.getElementsByTagName('li');
    // 将ul复制一遍，这样图片循环时不会出现断档
    aUl[0].innerHTML += aUl[0].innerHTML;
    // 让ul的宽度动态的等于所有图片宽度之和，这样能够使全部的图片都在一行
    aUl[0].style.width = 250*aLi.length + 'px';
    // 今日推荐的按钮显示与隐藏
    var oSliderBtn = getClass (oRecommend , 'slider_btn')[0];
    var prevBtn = oSliderBtn.getElementsByTagName('a')[0];
    var nextBtn = oSliderBtn.getElementsByTagName('a')[1];
    oSliderBtn.onmouseover = oGoodsRem.onmouseover = function () {
        showHide(oSliderBtn);
    };
    oSliderBtn.onmouseout = oGoodsRem.onmouseout = function () {
        showHide(oSliderBtn);
    };
    // 今日推荐的图片轮播
    var bStop = true;
    var iPosition = 0;
    // 确定图片改变left值的距离
    var iChangeLen = parseInt(getStyle(aUl[0] , 'width')) / 2;
    aUl[0].style.left = 0;
    // 点击向前
    myAddEvent(prevBtn , 'click' , function () {
        // 取当前的left的值，将这个值对ul的宽度取余，如果不为零那么表明运动还未结束
        // 如果用户在运动未结束时再次点击按钮，那么运动不会触发
        var iJudge = parseInt(getStyle(aUl[0] , 'left')); 
        if (iJudge%1000  === 0) {
            // 如果图片运动到iChangeLen处，将图片拉回来到0px处重新开始运动
            if (aUl[0].style.left === ('-'+iChangeLen+'px')) {
                aUl[0].style.left = '0';
                iPosition = 0;
            }
            // 每点击一次向前的按钮，left的值需要减少1000px
            iPosition -= 1000;
            move(aUl[0] , {
                left : iPosition
            } , 15);
        }
    });
    // 点击向后
    myAddEvent(nextBtn , 'click' , function () {
        var iJudge = parseInt(getStyle(aUl[0] , 'left')); 
        if (iJudge%1000  === 0) {
            // 如果图片的位置在0px，那么将图片拉至iChangeLen再开始运动
            if (aUl[0].style.left === '0px') {
                aUl[0].style.left = ('-'+iChangeLen+'px');
                iPosition = -iChangeLen;
            }
            iPosition += 1000;
            move(aUl[0] , {
                left : iPosition
            } , 15); 
        } 
    });

    // 猜你喜欢
    var oGuessLike = id('guess-like');
    var oGuessLikeChange = getClass(oGuessLike , 'guess-like-top')[0].getElementsByTagName('a')[0];
    var aGuessLikeContent = getClass(oGuessLike , 'guess-like-content');
    // 猜你喜欢的商品栏切换
    myAddEvent(oGuessLikeChange , 'click' , function () {
        for (var i = 0; i < aGuessLikeContent.length; i++) {
            showHide(aGuessLikeContent[i]);
        }
    });
    // 猜你喜欢的图标横向移动
    var timer = null;
    var oSpacer = getClass(oGuessLike , 'spacer')[0];
    myAddEvent(oGuessLike , 'mouseover' , function () {
        timer = setTimeout ( function () {
            oSpacer.style.right = '1210px';
            move (oSpacer , {
                right : 0
            } , 15);
        } , 600);
    });
    myAddEvent(oGuessLike , 'mouseout' , function () {
        clearTimeout(timer);
    });

    // 品质生活
    var oQualityClife = id('quality_life');
    var aItemPic = getClass(oQualityClife , 'ct_item_big');
    var aItemMove = getClass(oQualityClife , 'ct_move');
    for (var i = 0; i < aItemPic.length; i++) {
        aItemPic[i].index = i;
        // 鼠标移入后图片向左移动8px
        myAddEvent(aItemPic[i] , 'mouseover' , function () {
            move(aItemMove[this.index] , {
                left : -8
            });
        });
        myAddEvent(aItemPic[i] , 'mouseout' , function () {
            move(aItemMove[this.index] , {
                left : 0
            });
        });
    }
});
/* 综合推荐结束 */
/*------------------------------------- 页面流程结束 -----------------------------------------*/
