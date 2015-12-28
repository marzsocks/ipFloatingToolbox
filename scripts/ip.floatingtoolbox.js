$.fn.ip_FloatingToolbox = function (options) {

    var options = $.extend({

        menus: [],
        relativeTo: document.body,
        position: null, // ['right', 'top'],// Note there the difference between [right,top] and [top,right] -> it is what it means unless axisContainment is off
        positionNAN: null,
        offset: { x: 15, y: 15 },
        size: null, //{ width: 150, height: 250 },
        axisContainment: true,
        windowContainment: true,
        animate: 500,
        events: { handleDblClick: null, onLoad: null, click: null },
        mode: 'LeftClick',
        setAnchor: null,
        resetPosition: false,
        speech: true,
        toolbarHandle: true,
        theme: 'theme-dark',
        zIndex: null,

    }, options);

    var ControlID = $(this).attr('id');
    var ToolbarHandle = $(this).find('.ip_FloatingToolbarHandle');
    var FloatingToolbarContainer = $(this).find('.ip_FloatingToolbarContainer');
    var Error = '';
    var Position = { callout: '' }
    var isVisible = $(this).is(":visible");

    if (options.resetPosition && this[0].anchor) {
                
        options.relativeTo = this[0].anchor.relativeTo;
        options.position = this[0].anchor.position;
        options.offset = this[0].anchor.offset;
        options.speech = this[0].anchor.speech;
        if (this[0].anchorX && this[0].anchorY) {
            options.relativeTo = null;
            $(this).animate({ top: this[0].anchorY, left: this[0].anchorX }, options.animate, 'easeInOutQuint');
        }
        else { Position = $(this).ip_PositionElement(options); }

        if (options.menus.length == 0) { return; }
    }
    
    $(this).addClass('ip_FloatingToolbar');
    $(this).appendTo(document.body);
    $(this).attr('mode', options.mode);
    $(this).addClass('theme-dark');

    if (ToolbarHandle.length == 0 && options.toolbarHandle) { $(this).prepend('<div class="ip_FloatingToolbarHandle" title="Double click to reset position"></div>'); ToolbarHandle = $(this).find('.ip_FloatingToolbarHandle'); }
    if (FloatingToolbarContainer.length == 0) { $(this).append('<div class="ip_FloatingToolbarContainer"></div>'); FloatingToolbarContainer = $(this).find('.ip_FloatingToolbarContainer')[0]; }

    //Load up menus
    if (options.menus.length > 0) {

        $(FloatingToolbarContainer).find('.ip_FloatingToolbarMenu').hide();
        for (var i = 0; i < options.menus.length; i++) {
            if ($(FloatingToolbarContainer).find(options.menus[i]).length == 0) {

                $(options.menus[i]).clone(true, true).appendTo(FloatingToolbarContainer);

            }
            $(FloatingToolbarContainer).find(options.menus[i]).show();
        }

    }

    if (options.size != null) {

        $(this).outerWidth(options.size.width);
        $(this).outerHeight(options.size.height);

    }

    if (options.zIndex != null) { $(this).css('z-index', options.zIndex); }

    if (!isVisible) { options.animate = 0; }
    if (options.relativeTo != null) { Position = $(this).ip_PositionElement(options); }
    else if (options.position != null && options.position.top && options.position.left) { $(this).animate({ top: options.position.top, left: options.position.left }, options.animate, 'easeInOutQuint'); }

    $('#ip_FloatingToolbarSpeech').attr('class', '');
    if (options.speech && Position.callout != '') {
        
        var SpeechClass = Position.callout;

        if ($('#ip_FloatingToolbarSpeech').length == 0) { $(this).append('<b id="ip_FloatingToolbarSpeech"></b>'); }
        $('#ip_FloatingToolbarSpeech').addClass('ip_Speech ' + SpeechClass);
        $('#ip_FloatingToolbarSpeech').addClass(options.theme);

    }

    $(this).draggable({

        start: function () {

            $('#ip_FloatingToolbarSpeech').removeClass("top");
            $('#ip_FloatingToolbarSpeech').removeClass("topLeft");
            $('#ip_FloatingToolbarSpeech').removeClass("topRight");
            $('#ip_FloatingToolbarSpeech').removeClass("Bottom");
            $('#ip_FloatingToolbarSpeech').removeClass("BotomLeft");
            $('#ip_FloatingToolbarSpeech').removeClass("BottomRight");
            $('#ip_FloatingToolbarSpeech').removeClass("right");
            $('#ip_FloatingToolbarSpeech').removeClass("rightTop");
            $('#ip_FloatingToolbarSpeech').removeClass("rightBottom");
            $('#ip_FloatingToolbarSpeech').removeClass("left");
            $('#ip_FloatingToolbarSpeech').removeClass("leftTop");
            $('#ip_FloatingToolbarSpeech').removeClass("leftBottom");
            $('#ip_FloatingToolbarSpeech').removeClass("ip_Speech");

        },
        stop: function (args) {

            this.anchorY = $(this).position().top;
            this.anchorX = $(this).position().left;
        },
        handle: '.ip_FloatingToolbarHandle',
        containment:
        [$(document).scrollLeft(), $(document).scrollTop(),
        $(document).scrollLeft() + $(window).width() - $(this).outerWidth(),
        $(document).scrollTop() + $(window).height() - $(this).outerHeight()]
    });

    //SETUP EVENTS
    if (typeof options.events.dblclick == "function") {

        $(this).unbind('dblclick');
        $(this).on('dblclick', function () { options.events.dblclick() });

    }

    $(this).unbind('click');
    if (typeof options.events.click == "function") {

        $(this).on('click', function () { options.events.click() });

    }

    $(ToolbarHandle).unbind('click');
    $(ToolbarHandle).on('click', function (e) { e.stopPropagation(); });

    if (options.setAnchor) {

        this[0].anchor = {
            relativeTo: options.relativeTo,
            position: options.position,
            offset: options.offset,
            speech: options.speech
        }
        this[0].anchorX = null,
        this[0].anchorY = null
    }

    if (typeof options.events.onLoad == "function") { options.events.onLoad(this) }

    if (!isVisible) { $(this).fadeIn(100); }

    if (Error != '') { ip_RaiseEvent(GridID, 'warning', null, Error); }
}