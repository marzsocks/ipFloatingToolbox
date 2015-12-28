$.fn.ip_InitControls = function (options) {

    var options = $.extend({


    }, options);

    var ControlID = $(this).attr('id');


    $(this).find('.ip_DropDown').each(function () { $(this).ip_DropDown({ init: true, defaultIndex: 1, text: 'hello', dropDownItems: [{ key: 'aa', value: 'aval' }, { key: 'bb', value: 'Times Roman' }, { key: 'cc', value: 'cval' }] }); });

    
    
}

$.fn.ip_PositionElement = function (options) {

    var options = $.extend({

        relativeTo: document.body,
        position: null,// Note there the difference between [right,top] and [top,right] -> it is what it means unless axisContainment is off
        positionNAN: [],
        offset: { y: 0, x: 0 },
        axisContainment: true,
        windowContainment: true,
        animate: 600

    }, options);

    var ControlID = $(this).attr('id');

    if ($(document.body).children(this) == 0) { $(this).appendTo(document.body); }

    //Automatically decide the  best position
    if (options.relativeTo != null) {
        if (options.position == null) {

            var Q = 1;
            var rQ = { top: 0, left: 0, bottom: 0, right: 0 }
            var qWidth = Math.ceil($(window).width() / 3);
            var qHeight = Math.ceil($(window).height() / 3);
            var rWidth = $(options.relativeTo).outerWidth(true);
            var rHeight = $(options.relativeTo).outerWidth(true);
            var rTop = $(options.relativeTo).offset().top;
            var rLeft = $(options.relativeTo).offset().left;
            var rRight = rWidth + rLeft;
            var rBottom = rHeight + rTop;
            //var objWidth = $(this).width();
            //var objHeight = $(this).height();

            var q1 = { top: qHeight * 0, left: qWidth * 0, bottom: (qHeight * 0) + qHeight, right: (qWidth * 0) + qWidth }
            var q2 = { top: qHeight * 0, left: qWidth * 1, bottom: (qHeight * 0) + qHeight, right: (qWidth * 1) + qWidth }
            var q3 = { top: qHeight * 0, left: qWidth * 2, bottom: (qHeight * 0) + qHeight, right: (qWidth * 2) + qWidth }

            var q4 = { top: qHeight * 1, left: qWidth * 0, bottom: (qHeight * 1) + qHeight, right: (qWidth * 0) + qWidth }
            var q5 = { top: qHeight * 1, left: qWidth * 1, bottom: (qHeight * 1) + qHeight, right: (qWidth * 1) + qWidth }
            var q6 = { top: qHeight * 1, left: qWidth * 2, bottom: (qHeight * 1) + qHeight, right: (qWidth * 2) + qWidth }

            var q7 = { top: qHeight * 2, left: qWidth * 0, bottom: (qHeight * 2) + qHeight, right: (qWidth * 0) + qWidth }
            var q8 = { top: qHeight * 2, left: qWidth * 1, bottom: (qHeight * 2) + qHeight, right: (qWidth * 1) + qWidth }
            var q9 = { top: qHeight * 2, left: qWidth * 2, bottom: (qHeight * 2) + qHeight, right: (qWidth * 2) + qWidth }

            if (rTop <= q1.bottom && rLeft <= q1.right) { options.position = ['right', 'top']; Q = 1; }
            else if (rTop <= q2.bottom && rLeft <= q2.right) { options.position = ['left', 'top']; Q = 2; }
            else if (rTop <= q3.bottom && rLeft <= q3.right) { options.position = ['left', 'top']; Q = 3; }
            else if (rTop <= q4.bottom && rLeft <= q4.right) { options.position = ['right', 'center']; Q = 4; }
            else if (rTop <= q5.bottom && rLeft <= q5.right) { options.position = ['left', 'center']; Q = 5; }
            else if (rTop <= q6.bottom && rLeft <= q6.right) { options.position = ['left', 'center']; Q = 6; }
            else if (rTop <= q7.bottom && rLeft <= q7.right) { options.position = ['right', 'bottom']; Q = 7; }
            else if (rTop <= q8.bottom && rLeft <= q8.right) { options.position = ['left', 'bottom']; Q = 8; }
            else if (rTop <= q9.bottom && rLeft <= q9.right) { options.position = ['left', 'bottom']; Q = 9; }

        }
    }

    if (options.positionNAN) {
        for (var i = 0; i < options.positionNAN.length; i++) {

            if (options.positionNAN[i] == options.position[0] && options.position[0] == 'left') { options.position[0] = (Q >= 7 ? 'top' : 'bottom') }
            else if (options.positionNAN[i] == options.position[0] && options.position[0] == 'right') { options.position[0] = (Q >= 7 ? 'top' : 'bottom') }
            else if (options.positionNAN[i] == options.position[0] && options.position[0] == 'top') { options.position[0] = (Q == 2 || Q == 3 || Q == 5 || Q == 6 || Q == 8 || Q == 9 ? 'left' : 'right') }
            else if (options.positionNAN[i] == options.position[0] && options.position[0] == 'bottom') { options.position[0] = (Q == 2 || Q == 3 || Q == 5 || Q == 6 || Q == 8 || Q == 9 || options.positionNAN.indexOf('right') != -1 ? 'left' : 'right') }
            else if (options.positionNAN[i] == options.position[1] && options.position[1] == 'center') { options.position[1] = (Q == 2 || Q == 3 || Q == 5 || Q == 6 || Q == 8 || Q == 9 || options.positionNAN.indexOf('right') != -1 ? 'left' : 'right') }

            if ((options.position[0] == 'bottom' || options.position[0] == 'top') && (options.position[1] == 'bottom' || options.position[1] == 'top')) { options.position[1] = (Q == 1 || Q == 2 || Q == 4 || Q == 5 || Q == 7 || Q == 8 ? 'left' : 'right'); }
            else if ((options.position[0] == 'left' || options.position[0] == 'left') && (options.position[1] == 'left' || options.position[1] == 'right')) { options.position[1] = 'bottom'; }
        }
    }

    var topR = (options.relativeTo == screen || options.relativeTo == window ? $(document).scrollTop() : $(options.relativeTo).offset().top);
    var leftR = (options.relativeTo == screen || options.relativeTo == window ? $(document).scrollLeft() : $(options.relativeTo).offset().left);
    var widthR = (options.relativeTo == screen || options.relativeTo == window ? window.innerWidth : $(options.relativeTo).outerWidth());
    var heightR = (options.relativeTo == screen || options.relativeTo == window ? window.innerHeight : $(options.relativeTo).outerHeight());
    var placeTop = 0;
    var placeLeft = 0;
    var axisContainment = { x: false, y: false };
    var returnObject = { callout: '', position: null };

    options.size = {
        width: $(this).outerWidth(true),
        height: $(this).outerHeight(true)
    }

    //Workout axis containment
    for (var i = 0; i < options.position.length; i++) {

        options.position[i] = options.position[i].toLowerCase().trim();

        if (options.axisContainment) {
            if (!axisContainment.x && (options.position[i] == 'left' || options.position[i] == 'right')) { axisContainment.y = true; }
            if (!axisContainment.y && (options.position[i] == 'top' || options.position[i] == 'bottom')) { axisContainment.x = true; }
        }

    }



    if (options.position.indexOf('inside') != -1) {
        placeTop = topR;
        placeLeft = leftR;
    }

    if (options.position.indexOf('top') != -1) {
        placeTop = topR - (options.position.indexOf('inside') == -1 ? options.size.height : 0);
        if (options.position.indexOf('left') == -1 && options.position.indexOf('right') == -1) { placeLeft = leftR; }
    }

    if (options.position.indexOf('bottom') != -1) {
        placeTop = topR + (options.position.indexOf('inside') == -1 ? heightR : Math.max(0, heightR - options.size.height));
        if (options.position.indexOf('left') == -1 && options.position.indexOf('right') == -1) { placeLeft = leftR; }
    }

    if (options.position.indexOf('left') != -1) {
        if (options.position.indexOf('top') == -1 && options.position.indexOf('bottom') == -1) { placeTop = heightR; }
        placeLeft = leftR - (options.position.indexOf('inside') == -1 ? options.size.width : 0);
    }

    if (options.position.indexOf('right') != -1) {
        if (options.position.indexOf('top') == -1 && options.position.indexOf('bottom') == -1) { placeTop = heightR; }
        placeLeft = leftR + (options.position.indexOf('inside') == -1 ? widthR : Math.max(0, widthR - options.size.width));
    }

    if (options.position.indexOf('center') != -1) {

        if (options.position.indexOf('top') == -1 && options.position.indexOf('bottom') == -1) {
            placeTop = topR;
            placeTop += Math.max(0, ((heightR - options.size.height) / 2));
        }

        if (options.position.indexOf('right') == -1 && options.position.indexOf('left') == -1) {

            placeLeft = leftR;
            placeLeft += Math.max(0, ((widthR - options.size.width) / 2));
        }

    }

    if (axisContainment.y) {
        if (options.position.indexOf('bottom') == -1 && placeTop < topR) { placeTop = topR; }
        if (options.position.indexOf('center') == -1 && options.position.indexOf('top') == -1 && (placeTop + options.size.height > topR + heightR)) { placeTop = topR + (heightR - options.size.height); } //topR + Math.max(0, heightR - options.size.height);
        if (options.position.indexOf('center') != -1 && options.position.indexOf('top') == -1 && (placeTop + options.size.height > topR + heightR)) { placeTop = topR + ((heightR - options.size.height) / 2); } //topR + Math.max(0, heightR - options.size.height);
    }
    if (axisContainment.x) {
        if (options.position.indexOf('right') == -1 && placeLeft < leftR) { placeLeft = leftR; }
        if (options.position.indexOf('center') == -1 && options.position.indexOf('left') == -1 && (placeLeft + options.size.width > leftR + widthR)) { placeLeft = leftR + (widthR - options.size.width); } //leftR + Math.max(0, widthR - options.size.width);
        if (options.position.indexOf('center') != -1 && (placeLeft + options.size.width > leftR + widthR)) { placeLeft = leftR + ((widthR - options.size.width) / 2); }
    }

    //placeTop += options.offset.top;
    if (options.position[0] == 'top') { placeTop -= options.offset.y; } //else { placeTop += options.offset.top; }
    else if (options.position[0] == 'bottom') { placeTop += options.offset.y; }
    else if (options.position[0] == 'inside') { placeTop += options.offset.y; }

    if (options.position[0] == 'left') { placeLeft -= options.offset.x; } //else { placeLeft += options.offset.left; }
    else if (options.position[0] == 'right') { placeLeft += options.offset.x; }
    else if (options.position[0] == 'inside') { placeLeft += options.offset.x; }

    //placeLeft += options.offset.left;

    if (placeLeft > $(window).width()) { placeLeft = $(window).width() - $(this).outerWidth(true); }
    if (placeTop > $(window).height()) { placeTop = $(window).height() - $(this).outerHeight(true); }

    $(this).animate({ top: placeTop, left: placeLeft }, options.animate, 'easeInOutQuint');


    if (axisContainment.y && options.position.indexOf('left') != -1 && options.position.indexOf('top') != -1) { returnObject.callout = 'rightTop' }
    else if (axisContainment.y && options.position.indexOf('left') != -1 && options.position.indexOf('bottom') != -1) { returnObject.callout = 'rightBottom' }
    else if (axisContainment.y && options.position.indexOf('right') != -1 && options.position.indexOf('top') != -1) { returnObject.callout = 'leftTop' }
    else if (axisContainment.y && options.position.indexOf('right') != -1 && options.position.indexOf('bottom') != -1) { returnObject.callout = 'leftBottom' }
    else if (axisContainment.y && options.position.indexOf('right') != -1 && options.position.indexOf('top') != -1) { returnObject.callout = 'leftTop' }
    else if (axisContainment.x && options.position.indexOf('top') != -1 && options.position.indexOf('left') != -1) { returnObject.callout = 'bottomLeft' }
    else if (axisContainment.x && options.position.indexOf('top') != -1 && options.position.indexOf('right') != -1) { returnObject.callout = 'bottomRight' }
    else if (axisContainment.x && options.position.indexOf('bottom') != -1 && options.position.indexOf('left') != -1) { returnObject.callout = 'topLeft' }
    else if (axisContainment.x && options.position.indexOf('bottom') != -1 && options.position.indexOf('right') != -1) { returnObject.callout = 'topRight' }
    else if (options.position.indexOf('top') != -1) { returnObject.callout = 'bottom'; }
    else if (options.position.indexOf('left') != -1) { returnObject.callout = 'right'; }
    else if (options.position.indexOf('right') != -1) { returnObject.callout = 'left'; }
    else if (options.position.indexOf('bottom') != -1) { returnObject.callout = 'top'; }




    returnObject.position = options.position;

    return returnObject;

}

function ip_CursorPos(element, start, end) {

    var carret = { x: start, length: 0, text: '' }

    if (element != null) {

        carret.text = element.innerText || element.textContent;

        if (carret.text.length > start && (start != null || end != null)) {

            var rng = document.createRange(),
                    sel = getSelection(),
                    n,
                    o = 0,
                    x2 = 0,
                    tw = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, null);

            while (n = tw.nextNode()) {
                o += n.nodeValue.length;
                if (o > start) {
                    carret.x = n.nodeValue.length + start - o;
                    rng.setStart(n, carret.x);
                    start = Infinity;
                }
                if (end != null && o >= end) {
                    x2 = n.nodeValue.length + end - o;
                    rng.setEnd(n, x2);
                    break;
                }
            }

            sel.removeAllRanges();
            sel.addRange(rng);

        }
        else {


            var range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(element);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start        
            var selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection

            carret.x = carret.text.length;
        }

        carret.length = x2 - carret.x;
        if (carret.length < 0) { carret.length = 0; }

        return carret;

    }


    return null;
}


