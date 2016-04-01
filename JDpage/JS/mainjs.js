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
 * 获取样式的函数，主要是为了兼容IE
 * @param {string} attr 想要获取的样式
 */
function getStyle (oEle , value) {
    return oEle.currentStyle ? oEle.currentStyle[value] : getComputedStyle(oEle, null)[value];
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
 * 任意值的运动框架
 * @param {object} oEle    想要运动的那个对象
 * @param {number} iTarget 运动的目标值
 * @param {string｝value   想要去运动的样式
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
/*--------------------------------- 工具包函数结束 -------------------------------------*/



/*------------------------------- 焦点图共用函数开始 -----------------------------------*/
// focus(oFocusPic1 , 100 , true);

function focus(oEle , iTarget , boole) {

    var aFocusChild = getChild(oEle);
    var aSliderImage = aFocusChild[0].getElementsByTagName('li');
    var aSliderList = aFocusChild[1].getElementsByTagName('li');

    var iNow = 1;
    var playTimer = null;
    var timer = null;
    

    playTimer = chooseMove(aSliderImage , boole , iNow);

    myAddEvent(oEle , 'mouseover' , function () {
        clearInterval(playTimer);
    });
    myAddEvent(oEle , 'mouseout' , function () {
        playTimer = chooseMove(aSliderImage , boole , iNow);
    });
}
function chooseMove(aSliderImage , boole , iNow) {
    var timerFn = null;
    timerFn = setInterval(function () {
        if (boole) {
            opacityMove (iNow);
        } else {
            positionMove (iNow);
        }
        if (iNow < (aSliderImage.length-1)) {iNow = iNow+1;} else{iNow = 0;}
    },3000);

    return timerFn;
}
/**
 * 焦点图淡入淡出的运动,nav背景颜色的变化是通过切换class来实现的
 * @param ｛number｝iIndex 索引值，具体让第几张图片显示
 */
function opacityMove (aSliderImage , aSliderList , iIndex) {
    for (var i = 0; i < aSliderImage.length; i++) {

        if (aSliderImage[i].className == 'currentSlider') {
            aSliderImage[i].className = aSliderList[i].className = null;
            //move工具函数
            
            move(aSliderImage[i] , 0 ,'opacity');
        }
    }
    aSliderImage[iIndex].className = aSliderList[iIndex].className = 'currentSlider';
    //move工具函数
    move (aSliderImage[iIndex] , 100 , 'opacity');
}
// var oFocusPic = document.getElementById('FocusPic');
// var oSliderBtn = document.getElementById('slider_btn');
// function focus () {
//  var oBtnPrev = getClass(oSliderBtn , 'btn_prev')[0];
//  var oBtnNext = getClass(oSliderBtn , 'btn_next')[0];
//  var iNow = 1;
//  var playTimer = null;
//  var timer = null;
//  // 自动播放
//  playTimer = setInterval(function  () {
//      // doMove工具函数
//      doMove (iNow);
//      if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//  },3500);
//  //鼠标移入焦点图的区域自动播放暂停
//  oFocusPic.onmouseover = function  () {
//      clearInterval(playTimer);
//  };

//  // 鼠标移出后开启自动播放
//  oFocusPic.onmouseout = function  () {
//      playTimer = setInterval(function  () {
//          doMove (iNow);
//          if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//      },3500);
//  };

//  //前后按钮
//  for (var i = 0; i < aSliderImage.length; i++) {
//      //按钮显示
//      oSliderBtn.onmouseover = aSliderImage[i].onmouseover = function  () {
//          oSliderBtn.style.display='block';
//      };
//      oSliderBtn.onmouseout = aSliderImage[i].onmouseout = function  () {
//          oSliderBtn.style.display='none';
//      };
//      // 点击按钮时图片切换
//      oBtnPrev.onclick = function  () {
//          if (iNow > 1) {iNow = iNow-1;} else{iNow = (aSliderList.length-1);}
//          doMove (iNow);
//      };
//      oBtnNext.onclick = function  () {
//          if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//          doMove (iNow);
//      };
//  }
//  //轮播图上的list鼠标移入切换图片
//  for (var i = 0; i < aSliderList.length; i++) {
//      aSliderList[i].index = i;
//      aSliderList[i].onmouseover = function  () {
//          var that = this;
//          clearTimeout(timer);
//          if (this.style.backgroundColor != '#C81623') {
//              timer = setTimeout(function  () {
//                  doMove (that.index);
//                  iNow = that.index;
//              },400);
//          }
//      };
//  }
// }

/**
 * 焦点图横向滚动的运动
 * @param ｛number｝iIndex 索引值，具体让第几张图片显示
 */
function positionMove(iIndex) {

    }



/*------------------------------- 焦点图共用函数结束 -----------------------------------*/


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
    var aVisbleCategory = getClass(oCategory,'visble_category');

    for (i = 0; i < aVisbleCategory.length; i++) {
        aVisbleCategory[i].index = i;

        myAddEvent(aVisbleCategory[i] , 'mouseover' , function () {
            this.className = 'unvisble_category';
            showHide(aHideLayers[this.index]);
        });
        myAddEvent(aVisbleCategory[i] , 'mouseout' , function () {
            this.className = 'visble_category';
            showHide(aHideLayers[this.index]);
        });
    }

    var oNav = id('nav');
    var aHideLayers = getClass(oNav,'hide_layers');

    for (i = 0; i < aHideLayers.length; i++) {
        aHideLayers[i].index = i;

        myAddEvent(aHideLayers[i] , 'mouseover' , function () {
            showHide(this);
            // aVisbleCategory[this.index].className = 'unvisble_category';
        });
        myAddEvent(aHideLayers[i] , 'mouseout' , function () {
            showHide(this);
            // aVisbleCategory[this.index].className = 'visble_category';
        });
    }
});
/* 详细商品栏的显示与隐藏结束 */

/**
 * 详细商品栏右边的焦点图
 */
myReady(function () {
    var oFocusPic1 = id('FocusPic1');
    var aSliderImage = getChild(oFocusPic1)[0].getElementsByTagName('li');
    // 焦点图初始化
    aSliderImage[0].style.opacity = 1;
    aSliderImage[0].style.filter = 'alpha(opacity:100)';

    // focus(oFocusPic1 , 100 , true);
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
                    move(aText[that.index] , 65 , 'right');
                } else{
                    move(aText[that.index] , 45 , 'right');
                }
            },200);
        });

        myAddEvent(aLi[i] , 'mouseout' , function () {
            clearTimeout(this.timer);
            aIcon[this.index].style.backgroundColor = '#7a6e6e';
            move(aText[this.index] , 0 , 'right');
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
    var aUl = oRecommend.getElementsByTagName('ul');
    var aLi = oRecommend.getElementsByTagName('li');
    aUl[0].style.width = 250*aLi.length + 'px';

    // 猜你喜欢
    var oGuessLike = id('guess-like');
    var oGuessLikeChange = getClass(oGuessLike , 'guess-like-top')[0].getElementsByTagName('a')[0];
    var aGuessLikeContent = getClass(oGuessLike , 'guess-like-content');
    console.log(aGuessLikeContent);

    myAddEvent(oGuessLikeChange , 'click' , function () {
        for (var i = 0; i < aGuessLikeContent.length; i++) {
            showHide(aGuessLikeContent[i]);
        }
    });
});
/* 综合推荐结束 */

/*------------------------------------- 页面流程结束 -----------------------------------------*/






//  playTimer = setInterval(function  () {
//      // doMove工具函数
//      doMove (iNow);
//      if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//  },3500);
//  //鼠标移入焦点图的区域自动播放暂停
//  oFocusPic.onmouseover = function  () {
//      clearInterval(playTimer);
//  };

//  // 鼠标移出后开启自动播放
//  oFocusPic.onmouseout = function  () {
//      playTimer = setInterval(function  () {
//          doMove (iNow);
//          if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//      },3500);
//  };




// var oFocusPic = document.getElementById('FocusPic');
// var oSliderBtn = document.getElementById('slider_btn');
// function focus () {
//  var oBtnPrev = getClass(oSliderBtn , 'btn_prev')[0];
//  var oBtnNext = getClass(oSliderBtn , 'btn_next')[0];
//  var iNow = 1;
//  var playTimer = null;
//  var timer = null;
//  // 自动播放
//  playTimer = setInterval(function  () {
//      // doMove工具函数
//      doMove (iNow);
//      if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//  },3500);
//  //鼠标移入焦点图的区域自动播放暂停
//  oFocusPic.onmouseover = function  () {
//      clearInterval(playTimer);
//  };

//  // 鼠标移出后开启自动播放
//  oFocusPic.onmouseout = function  () {
//      playTimer = setInterval(function  () {
//          doMove (iNow);
//          if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//      },3500);
//  };

//  //前后按钮
//  for (var i = 0; i < aSliderImage.length; i++) {
//      //按钮显示
//      oSliderBtn.onmouseover = aSliderImage[i].onmouseover = function  () {
//          oSliderBtn.style.display='block';
//      };
//      oSliderBtn.onmouseout = aSliderImage[i].onmouseout = function  () {
//          oSliderBtn.style.display='none';
//      };
//      // 点击按钮时图片切换
//      oBtnPrev.onclick = function  () {
//          if (iNow > 1) {iNow = iNow-1;} else{iNow = (aSliderList.length-1);}
//          doMove (iNow);
//      };
//      oBtnNext.onclick = function  () {
//          if (iNow < (aSliderList.length-1)) {iNow = iNow+1;} else{iNow = 0;}
//          doMove (iNow);
//      };
//  }
//  //轮播图上的list鼠标移入切换图片
//  for (var i = 0; i < aSliderList.length; i++) {
//      aSliderList[i].index = i;
//      aSliderList[i].onmouseover = function  () {
//          var that = this;
//          clearTimeout(timer);
//          if (this.style.backgroundColor != '#C81623') {
//              timer = setTimeout(function  () {
//                  doMove (that.index);
//                  iNow = that.index;
//              },400);
//          }
//      };
//  }
// }