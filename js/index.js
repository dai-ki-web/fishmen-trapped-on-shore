function GetRect(element) {
    var rect = element.getBoundingClientRect();
    var top = document.documentElement.clientTop;
    var left = document.documentElement.clientLeft;
    return {
        top: rect.top - top,
        bottom: rect.bottom - top,
        left: rect.left - left,
        right: rect.right - left
    }
}

// 控制对话框
// 获取视窗高度
var Height = document.documentElement.clientHeight;
function fadeOut(eleArray, cN) {
    for (var i = 0; i < eleArray.length; i++) {
        var h = eleArray[i].clientHeight;
        var boxData = GetRect(eleArray[i]);
        if (boxData.top <= (Height - h) * 1) {
            eleArray[i].className = "ani-show " + cN;
        }
        else if (boxData.top > (Height - h) * 1) {
            eleArray[i].className = "ani-dishow " + cN;
        }
    }

}

var body = document.querySelector("body");

// 控制背景
function bgMove(ele, bg) {
    var titlepos = GetRect(ele);
    var tempBox = bg.querySelector("img");
    if (titlepos.top <= 0) {

        tempBox.className = "bgTitleIn";
        if (titlepos.bottom <= Height && titlepos.bottom > 0) {
            // 移动的距离
            // console.log(titlepos.top);
            bg.style.top = (titlepos.bottom - Height) + "px";
        }
    }
    else {
        tempBox.className = "bgTitleOut";
    }

}

function checkPage(obj) {
    var left = obj.parentNode.querySelectorAll("button")[0];
    var right = obj.parentNode.querySelectorAll("button")[1];
    var flag = parseInt(obj.dataset.flag);
    var maxPage = parseInt(obj.dataset.max);
    console.log(flag);
    console.log(maxPage);
    if (flag == (maxPage - 1)) {
        right.style.display = "none";
        left.style.display = "block";
    }
    else if (flag == 0) {
        right.style.display = "block";
        left.style.display = "none";
    }
}

function next() {
    var obj = event.srcElement.parentNode.querySelector("iframe");
    var adrr = obj.src.split("#")[0];
    var flag = parseInt(obj.dataset.flag);
    flag += 1;
    obj.src = adrr + "#slide-" + flag;
    obj.dataset.flag = flag;
    checkPage(obj);
}

function previous() {
    var obj = event.srcElement.parentNode.querySelector("iframe");
    var adrr = obj.src.split("#")[0];
    var flag = parseInt(obj.dataset.flag);
    flag -= 1;
    obj.src = adrr + "#slide-" + flag;
    obj.dataset.flag = flag;
    checkPage(obj);
}

function navFade(nav, scrollH) {
    var obj = nav.querySelectorAll("img");
    var sh = scrollH - headerH - personH;
    console.log(sh);
    var n = parseInt(sh / 350);
    for (var i = 0; i <= n; i++) {
        obj[i].className = "bgTitleIn";
    }
}

function dolphin(obj) {
    if (GetRect(ending).bottom <= Height) {
        obj.className = "dolUp";
    }
}

// 对话框
var wordP1 = []
for (var i = 0; i < 4; i++) {
    wordP1.push(document.querySelector(".intro-word1").querySelectorAll("div")[i].querySelector("img"));
}
var wordP2 = []
for (var i = 0; i < 2; i++) {
    wordP2.push(document.querySelector(".intro-word2").querySelectorAll("div")[i].querySelector("img"));
}

// 各部分的高度
var headerH = document.querySelector("header").clientHeight;
var introH = document.getElementById("intro").clientHeight;
var situaH = document.getElementById("situation").clientHeight;
var articleZeroH = document.getElementById("partZero").clientHeight;
var hdOneH = document.getElementById("hdOne").clientHeight;
var articleOneH = document.getElementById("partOne").clientHeight;
var hdTwoH = document.getElementById("hdTwo").clientHeight;
var articleTwoH = document.getElementById("partTwo").clientHeight;
var hdThreeH = document.getElementById("hdThree").clientHeight;
var articleThreeH = document.getElementById("partThree").clientHeight;
var hdFourH = document.getElementById("hdFour").clientHeight;
var articleFourH = document.getElementById("partFour").clientHeight;

var personH = document.getElementById("person").clientHeight;


// sticky
var stickyEl1 = $('.cover').sticksy({ topSpacing: 0 })[0];
var stickyEl2 = $('.nav').sticksy({ topSpacing: 90 })[0];
var stickyEl3 = $('.graph-stone').sticksy({ topSpacing: 50 })[0];
// var stickyEl4 = $('.intro-word1').sticksy({ topSpacing: 60 })[0];

var iframe = document.getElementById("situation").querySelectorAll("iframe")[1];
var buhchang = document.getElementById("buchang");
var nav = document.getElementById("nav");
var ending = document.getElementById("ending");
var dolph = document.getElementById("dolphin");

// 章节背景图
var ele;
var elebg = [];
for (var i = 0; i < 5; i++) {
    elebg.push(document.getElementById("bg" + (i + 1)))
}

function showTitle(scrollH) {
    if (scrollH > 10 && scrollH <= headerH) {
        // 标题浮现效果
        var cover = document.getElementById("cover");
        var title = cover.querySelector("div");
        title.className = "bigtitle";
        // 标题浮现效果
    }
}

function slide(scrollH) {
    if (scrollH > (headerH + introH) && scrollH <= (headerH + articleZeroH)) {
        var h = parseInt((scrollH - (headerH + introH) - 0.5 * Height) / 950);
        iframe.src = "https://flo.uri.sh/story/1006155/embed?auto=1#slide-" + h;
    }
}

function bgActive(scrollH) {
    if (scrollH > (headerH + articleZeroH - Height) && scrollH <= (headerH + articleZeroH + hdOneH)) {
        ele = document.getElementById("title1");
        bgMove(ele, elebg[0]);
        elebg[0].style.display = "block";
        elebg[1].style.display = "none";
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH - Height - 200) && scrollH <= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH)) {
        ele = document.getElementById("title2");
        bgMove(ele, elebg[1]);
        elebg[0].style.display = "none";
        elebg[1].style.display = "block";
        elebg[2].style.display = "none";
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH - Height - 200) && scrollH <= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH)) {
        ele = document.getElementById("title3");
        bgMove(ele, elebg[2]);
        elebg[1].style.display = "none";
        elebg[2].style.display = "block";
        elebg[3].style.display = "none";
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH - Height - 200) && scrollH <= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH + hdFourH)) {
        ele = document.getElementById("title4");
        bgMove(ele, elebg[3]);
        elebg[2].style.display = "none";
        elebg[3].style.display = "block";
        elebg[4].style.display = "none";
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH + hdFourH + articleFourH - Height - 200) && scrollH <= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH + hdFourH + articleFourH)) {
        elebg[3].style.display = "none";
        elebg[4].style.display = "block";
    }
}

window.onscroll = function () {
    var scrollH = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollH);
    fadeOut(wordP1, "leftOrigin");
    fadeOut(wordP2, "rightOrigin");
    if (GetRect(nav).top == 90) {
        navFade(nav, scrollH);
    }
    showTitle(scrollH);
    slide(scrollH);
    bgActive(scrollH);
    dolphin(dolph);
}