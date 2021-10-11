// 获取视窗高度
var Height = document.documentElement.clientHeight;
var body = document.querySelector("body");
document.querySelector("header").style.height = (Height + 200) + "px";
for (var i = 1; i < 5; i++) {
    document.getElementById("title" + i).style.height = (Height + 100) + "px";
}

// 对话框
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");

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

var toTop = 0.5 * (Height - 700);
// sticky
var stickyEl1 = $('.cover').sticksy({ topSpacing: 0 })[0];
var stickyEl2 = $('.nav').sticksy({ topSpacing: 90 })[0];
var stickyEl3 = $('.graph-stone').sticksy({ topSpacing: toTop })[0];

var iframe = document.getElementById("situation").querySelectorAll("iframe")[1];
var buhchang = document.getElementById("buchang");
var nav = document.getElementById("nav");
var ending = document.getElementById("ending");
var dolph = document.getElementById("dolphin");
var footer = document.querySelector("footer");
var side = document.querySelector("aside").querySelectorAll("li");
var as = document.querySelector("aside");

// 章节背景图
var ele;
var elebg = [];
for (var i = 0; i < 5; i++) {
    elebg.push(document.getElementById("bg" + (i + 1)))
}


function fadeOut1(obj, cN, num) {
    var word = [];
    for (var i = 0; i < num; i++) {
        word.push(obj.querySelectorAll(".intro-word1")[1].querySelectorAll("div")[i]);
    }
    var dis = parseInt((GetRect(obj).bottom - toTop - 700) / 200);
    word[num - dis - 1].className = "ani-show " + cN;
}

function fadeOut2(obj, cN, num) {
    var word = [];
    for (var i = 0; i < num; i++) {
        word.push(obj.querySelectorAll(".intro-word2")[1].querySelectorAll("div")[i]);
    }
    var dis = parseInt((GetRect(obj).bottom - toTop - 700) / 400);
    word[num - dis - 1].className = "ani-show " + cN;
}

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

// 控制背景
function bgMove(ele, bg) {
    var titlepos = GetRect(ele);
    var tempBox = bg.querySelector("div");
    if (titlepos.top <= 0) {
        tempBox.className = "bgTitleIn";
        if (titlepos.bottom <= Height && titlepos.bottom >= 0) {
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

function next(event) {
    var obj = event.srcElement.parentNode.querySelector("iframe");
    var adrr = obj.src.split("#")[0];
    var flag = parseInt(obj.dataset.flag);
    flag += 1;
    obj.src = adrr + "#slide-" + flag;
    obj.dataset.flag = flag;
    checkPage(obj);
}

function previous(event) {
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
    var n = parseInt(sh / 200);
    for (var i = 0; i <= n; i++) {
        obj[i].className = "bgTitleIn";
    }
}

function dolphin(obj) {
    if (GetRect(ending).bottom <= Height) {
        obj.className = "dolUp";
    }
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
        side[0].classList.add("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.remove("choosed");
        elebg[0].style.display = "block";
        elebg[1].style.display = "none";
        bgMove(ele, elebg[0]);
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH - Height - 200) && scrollH <= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH)) {
        side[0].classList.remove("choosed");
        side[1].classList.add("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.remove("choosed");
        ele = document.getElementById("title2");
        elebg[0].style.display = "none";
        elebg[1].style.display = "block";
        elebg[2].style.display = "none";
        bgMove(ele, elebg[1]);
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH - Height - 200) && scrollH <= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH)) {
        ele = document.getElementById("title3");
        side[0].classList.remove("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.add("choosed");
        side[3].classList.remove("choosed");

        elebg[1].style.display = "none";
        elebg[2].style.display = "block";
        elebg[3].style.display = "none";
        bgMove(ele, elebg[2]);
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH - Height - 200) && scrollH <= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH + hdFourH)) {
        ele = document.getElementById("title4");
        side[0].classList.remove("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.add("choosed");
        elebg[2].style.display = "none";
        elebg[3].style.display = "block";
        elebg[4].style.display = "none";
        bgMove(ele, elebg[3]);
    }

    if (scrollH > (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH + hdFourH + articleFourH - Height - 200)) {
        elebg[3].style.display = "none";
        elebg[4].style.display = "block";
    }
}

function foot() {
    if (GetRect(footer).top <= Height) {
        var box = document.getElementById("bg5");

        box.style.top = (GetRect(footer).top - Height) + "px";

    }
}

function playVoice(e) {
    var voice = e.srcElement.querySelector("audio");
    var state = voice.dataset.state;
    console.log(state);
    if (state == "true") {
        voice.pause();
        voice.dataset.state = "false";
    }
    else if (state == "false") {
        voice.play();
        voice.dataset.state = "true";
    }

}

function asideActive(scrollH) {
    if (scrollH < (headerH + articleZeroH) && scrollH >= 0) {
        side[0].classList.remove("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.remove("choosed");
    }
    if (scrollH >= (headerH + articleZeroH) && scrollH < (headerH + articleZeroH + hdOneH + articleOneH)) {
        side[0].classList.add("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.remove("choosed");
        as.style.display = "block";
    }

    if (scrollH >= (headerH + articleZeroH + hdOneH + articleOneH) && scrollH < (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH)) {
        side[0].classList.remove("choosed");
        side[1].classList.add("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.remove("choosed");
        as.style.display = "block";
    }

    if (scrollH >= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH) && scrollH < (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH)) {
        side[0].classList.remove("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.add("choosed");
        side[3].classList.remove("choosed");
        as.style.display = "block";
    }

    if (scrollH >= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH) && scrollH < (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH + hdFourH + articleFourH)) {
        side[0].classList.remove("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.add("choosed");
        as.style.display = "block";
    }

    if (scrollH >= (headerH + articleZeroH + hdOneH + articleOneH + hdTwoH + articleTwoH + hdThreeH + articleThreeH + hdFourH + articleFourH)) {
        side[0].classList.remove("choosed");
        side[1].classList.remove("choosed");
        side[2].classList.remove("choosed");
        side[3].classList.remove("choosed");
        as.style.display = "none";
    }
}
