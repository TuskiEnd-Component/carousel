/**
 * Created by TuskiEnd on 2015/6/27.
 */
;
(function ($) {
    var settings = {
        "container": '#carousel',  //容器
        "pWidth": "1000", //每张banner图宽度
        "cHeight": "460", //组件高度
        "cWidth": "100%", //组件宽度
        "imgWidth": "atuo",  //图片宽度
        "imgLeft": "0",  //图片默认left值
        "autoPlay": true,    //是否开启自动轮播
        "playInterval": 3000, //轮播间隔
        "alwaysCenter": true,    //图片是否始终居中显示
        "cData":[]   //banner图片url
    };
    var win = $(window),
        container,  //容器
        mindex = 0,   //当前图片索引
        bannerItems,    //切换组
        opts = {},    //参数
        cp = null;    //计时器

    var carousel = $.fn.carousel = function (options) {
        opts = $.extend({}, settings, options || {});
        container = $(opts.container);
        mindex = opts.cData.length - 1;

        carouselInit();
        //窗口resize方法
        win.resize(function () {
            carousel.calc();
        });
        container.hover(carousel.qingchuInterval, startInterval);

    };

    //点击改变当前banner
    carousel.changeCurrentPhoto = function (i) {
        carousel.clickChangePhoto(i);
    };

    //改变当前banner
    carousel.clickChangePhoto = function (cur) {
        if (cur === mindex) {
            return;
        }
        bannerItems.eq(cur).fadeIn('slow');
        bannerItems.eq(mindex + 0).fadeOut('slow');
        mindex = cur;
    };

    //切换banner
    carousel.changePhoto = function () {
        var next = mindex + 1;
        var cur = mindex + 0;
        if (next >= opts.cData.length) {
            next = 0;
        }
        bannerItems.eq(next).fadeIn('slow');
        bannerItems.eq(cur).fadeOut('slow');
        $('.spinner').removeClass('light');
        $('.spinner').eq(next).addClass('light');
        mindex = next;
    };

    //生成圆点
    carousel.createDot = function () {
        var str = '<div class="spinners"><div id="dot" >';

        for (var i = 0; i < opts.cData.length; i++) {
            str += '<div class="spinner"></div>';
        }
        str += '<div style="clear"></div></div></div>';
        var dWidth = opts.cData.length * 30;
        container.append(str);
        $('#dot').css({"bottom": "10px", "width": dWidth, "margin-left": -dWidth / 2});
        $(".spinner").eq(0).addClass('light');
        carousel.bindDot();
    };

    //生成DOM
    carousel.createDom=function(){
        var str='';
        for(var i=0;i<opts.cData.length;i++){
            str+='<div class="carouselUI_li"><a class="carouselUI_li_a" href="'+opts.cData[i].href+'"><img src="'+opts.cData[i].src+'"></a></div>';
        }
        container.prepend(str);
        bannerItems = container.find('.carouselUI_li_a');
        carousel.calc();
    };

    //圆点绑定事件
    carousel.bindDot = function () {
        $(".spinner").click(function () {
            $(".spinner").removeClass('light');
            $(this).addClass('light');
            var index = $(this).index();
            carousel.clickChangePhoto(index);
        });
    };


    //清除定时器
    carousel.qingchuInterval = function () {
        window.clearInterval(cp);
    };

    //图片位置居中
    carousel.calc = function () {
        var bwidth = parseInt($('body').width());
        if (bwidth < opts.pWidth) {
            opts.imgLeft = (-(opts.pWidth - bwidth) / 2) + "px";
            bannerItems.css('left', opts.imgLeft);
        } else {
            opts.imgLeft = (bwidth - opts.pWidth) / 2 + "px";
            opts.imgWidth = bwidth + "px";
            bannerItems.css({'left': opts.imgLeft, 'width': opts.imgWidth});
        }
    };

    //私有方法
    //开启计时器
    function startInterval() {
        carousel.qingchuInterval();
        cp = window.setInterval(carousel.changePhoto, opts.playInterval);
    };

    //初始化
    function carouselInit() {
        container.css({"width": opts.cWidth, "height": opts.cHeight});
        carousel.createDot();
        carousel.createDom();
        carousel.changePhoto();
        if(opts.autoPlay){
            startInterval();
        }
    };
})(jQuery);