/*=============================================================================================	
 Company    : PT Web Architect Technology - webarq.com
 Document   : Javascript Plugin Lib
 Author     : Your Name
 ==============================================================================================*/

$.fn.isOnScreen = function () {
    if (this.length) {
        var viewport = {};
        viewport.top = $(window).scrollTop();
        viewport.bottom = viewport.top + $(window).height();
        var bounds = {};
        bounds.top = this.offset().top;
        bounds.bottom = bounds.top + this.outerHeight();
        return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
    } else
        return false;
};

$.fn.fileInput = function (e) {
    var elem = this;

    elem.wrap('<div class="' + e.class_name + '"></div>');
    elem.css({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0
    });
    elem.parent('.' + e.class_name).css({
        position: 'relative',
        width: elem.outerWidth() - 2,
        height: elem.outerHeight() - 2,
        display: 'inline-block'
    });
    elem.parent('.' + e.class_name).append("<span>"+elem.attr('placeholder-text')+"</span>");
    elem.on('change', function () {
        var value = $(this).val();
        if (value != "") {
            value = value.substring(12, value.length);
            $(this).next("span").html(value);
        } else {
            $(this).next("span").html(elem.attr('placeholder-text'));
        }
    });
};


$.fn.optCustom = function (q) {
    var
            elem = this,
            s = {
                className: 'checkbox_custom',
            };
    s = $.extend(s, q);
    elem.wrap("<div class='" + s.className + "' style='position:relative' ></div>");
    elem.css({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        width: "100%",
        height: "100%"
    });
    elem.each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().addClass('active');
        }
    });
    elem.on('change', function () {
        if ($(this).attr('type') === "checkbox")
            if (!$(this).is(":checked")) {
                $(this).parent().removeClass('active');
            } else {
                $(this).parent().addClass('active');
            }
        else
            $("input[type=radio][name=" + $(this).attr('name') + "]").each(function () {
                if ($(this).is(":checked")) {
                    $("input[type=radio][name=" + $(this).attr('name') + "]").parent().removeClass('active');
                    $(this).parent().addClass('active');
                    return false;
                }
            });
    });

    elem.parent().on('click', function () {
        if ($(this).attr('type') === "checkbox")
            if (!$(this).children('input').is(":checked")) {
                $(this).removeClass('active');
            } else {
                // console.log('sa')
                $(this).addClass('active');
            }
        else
            $("input[type=radio][name=" + $(this).attr('name') + "]").each(function () {
                if ($(this).is(":checked")) {
                    $("input[type=radio][name=" + $(this).attr('name') + "]").parent().removeClass('active');
                    $(this).parent().addClass('active');
                    return false;
                }
            });
    });

};


$.fn.autoheight = function(s){
    var e = {
        column:'auto',
        boxList:'',
        outer: false
    }
    e = $.extend(e,s);
    var elem = this, a, b = 0, outheight = $(this).height(), column = e.column, excol = column - 1, outer = e.outer;
    var ffirst = 0, flast;
    if(e.boxList!=''){
        var countbox = $(e.boxList).length;
    }else{
        var countbox = 1;
    }

    if(outer == true){
        outheight = $(this).outerHeight();
    }

    var setheight = function(){
        if(column != 'auto'){
            for (var co = 0; co < countbox; co++) {
                if(e.boxList!=''){
                    var countlist = $(e.boxList).eq(co).find(elem).length;
                }else{
                    var countlist = elem.length;
                }
                for (var i = 0; i < countlist; i++) {
                    if(outer == true){
                        a = $(e.boxList).eq(co).find(elem).eq(i).outerHeight();
                    }else{
                        a = $(e.boxList).eq(co).find(elem).eq(i).height();
                    }
                    if(a > b){
                        b = a;
                    }
                    if(i % column == excol || i == countlist - 1){
                        var minex = excol;
                        if(i % column == excol){
                            minex = excol;
                        }else{
                            if(i % column == excol){
                                minex = 0;
                            }else if(i == countlist - 1){
                                if(i - flast > 1){
                                    minex = countlist - i;
                                }else{
                                    minex = countlist - i - 1;
                                }
                            }else{
                                minex = countlist - i - 1;
                            }
                        }
                        ffirst = i - minex;
                        flast = i;
                        for(var lss = ffirst; lss <= flast; lss++){
                            $(e.boxList).eq(co).find(elem).eq(lss).css('height', b+'px');
                            console.log(b);
                        }
                        b = 0;
                    }
                }
            }
            return true;
        }else{
            $(elem).each(function(){
                a = outheight;
                if(a > b){
                    b = a;
                }
            });
            $(elem).css('height', b+'px');
        }
    };
    setheight();
    var resizeTimer;

    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // console.log('sa');
            if(setheight()){
                location.reload();
            }
        }, 500);
    });
}

$.fn.equalheight = function(e){ 
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;

    $(this).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) { 
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) { 
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else { 
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest); 
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest); 
        }
    }); 
}

$.fn.responsiveImage = function (s) {
    var e ={
        type:undefined
    }
    e = $.extend(e,s);
    var elem = this, etype,
            action = function () {
                if(e.type == undefined){
                    etype = "background";
                }else{
                    etype = e.type;
                }
                window_width = $(window).width();
                elem.each(function () {
                    flag = false;
                    if (window_width > 1023 && $(this).attr('has_load') != 'large') {
                        images_url = $(this).attr('img-large');
                        $(this).attr('has_load', 'large');
                        flag = true;
                    } else if (window_width <= 1023 && window_width >= 640 && $(this).attr('has_load') != 'medium') {
                        images_url = $(this).attr('img-medium');
                        $(this).attr('has_load', 'medium');
                        flag = true;
                    } else if (window_width < 640 && window_width >= 0 && $(this).attr('has_load') != 'small') {
                        images_url = $(this).attr('img-small');
                        $(this).attr('has_load', 'small');
                        flag = true;
                    }
                    if (images_url == undefined) {
                        images_url = $(this).attr('img-large');
                        $(this).attr('has_load', 'large');
                    }

                    if (flag){
                        if(etype == "background"){
                            $(this).css('background-image', 'url('+images_url+')');
                        }else{
                            $(this).attr('src', images_url);
                        }     
                    }     
                });

            }
    action();
   
    var resizeTimer;

    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            action();
        }, 500);
    });
}