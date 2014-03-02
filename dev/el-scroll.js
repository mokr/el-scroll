// elScroll v.0.0.1
//
// Resources:
//-----------
//  http://stackoverflow.com/questions/12639888/disable-overscroll-in-ios-safari
//
//  https://developer.mozilla.org/en-US/docs/Web/Reference/Events
//
//  http://msdn.microsoft.com/en-us/library/windows/apps/hh767313.aspx
//

(function (window) {
    "use strict";

    // Optimize for minification by accessing object properties using brackets instead of dot
    var elScroll = 'elScroll',
        currentTarget = 'currentTarget',
        preventDefault = 'preventDefault',
        stopPropagation = 'stopPropagation',
        addEventListener = 'addEventListener';


    // Add Backbone event integration if Backbone is present i global scope
    if (typeof Backbone === 'object' && Backbone.on) {
        Backbone.on('elScroll:new', function () {
            module.apply(null, [].slice.call(arguments))
        })
    }

    // Prevent over scroll of the page itself
    document[addEventListener]('touchmove', function (e) {
        e[preventDefault]();
    });

    // Takes either a DOM element, the id of a DOM element or a jQuery object and makes it scrollable.
    var module = function (el, options) {

        var scrollTop,// of current el when scroll action starts.
            firstTouch,// Touch event supports multiple fingers. We use the fist.
            touchStartX, // X coordinate where current scroll "session" started
            touchStartY, // Y coordinate where current scroll "session" started
            elScrollHeight,// "Height of the scroll view of an element; it includes the element padding but not its margin", ref mdn
            elOffsetHeight,// "Height of an element relative to the element's offsetParent.", ref mdn
            touchX, // X coordinate for update during scroll
            touchY, // Y coordinate for update during scroll

        // Give user the option to disable certain features
            applyStyling = true; // Adds essential styling programmatically

        // Handle options
        if (options) {
            applyStyling = options.applyStyling === undefined ? true : options.applyStyling;
        }

        // Handle the different argument types it can be invoked with
        if (typeof el === 'string') {
            el = document.getElementById(el);
        } else if (typeof jQuery === 'function' && el instanceof jQuery) {
            el = el.get(0); // unwrap from jQuery
        }


        // Set basic scroll related styling.
        // Added these essentials programmatically to make the module self-contained and very simple to use.
        if (applyStyling) {
            el.style.webkitOverflowScrolling = 'touch';
            el.style.overflowY = 'scroll';
            el.style.touchAction = 'pan-y';
        }


        // New scroll action started. Register initial data.
        el[addEventListener]('touchstart', function (e) {

            // Register initial data for this scroll action.
            // This is used as reference when comparing data received in 'touchmove' events
            scrollTop = e[currentTarget].scrollTop;
            firstTouch = e.touches[0];
            touchStartX = firstTouch.pageX;
            touchStartY = firstTouch.pageY;
            elScrollHeight = e[currentTarget].scrollHeight;
            elOffsetHeight = e[currentTarget].offsetHeight;

            e[stopPropagation]();
        });

        // Perform calculations base on current data in ongoing scroll
        el[addEventListener]('touchmove', function (e) {
            touchX = e.pageX;
            touchY = e.pageY;

            // Prevent default if any of the following conditions are met.
            // This avoids over scroll
            (Math.abs(touchStartX - touchX) > 10
                || (scrollTop === 0 && touchY > touchStartY)
                || (scrollTop === (elScrollHeight - elOffsetHeight) && touchY < touchStartY))
            && e[preventDefault]();

            // Prevent this event from reaching the document as that would cancel it
            // due to the previously registered event listener
            e[stopPropagation]();
        });

        // End scrolling
//        el[addEventListener]('touchend', function (e) {
//            e[stopPropagation]();
//        });
    };


    // Expose module in the current environment
    //
    // AMD module (Require.js)
    if (typeof define === "function" && define.amd) {
        define(elScroll, [], function () {
            return module;
        });

        // module-loader-tdd module
    } else if (typeof modules === 'object' && modules.create) {
        modules.create(elScroll, function () {
            return module;
        });

        // Export as global
    } else {
        window[elScroll] = module;
    }

}(typeof window === 'undefined' ? {} : window));

