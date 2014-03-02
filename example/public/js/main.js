modules.initialize(function (require) {
    "use strict";

    var elScroll = require('elScroll');

    // Test with element id, existing element, existing element wrapped in jQuery object
    var sidebar = 'sidebar',
        content = document.getElementById('content'),
        rightbar = $('#rightbar');


    // Apply el-scroll functionality to elements
    elScroll(sidebar);

    elScroll(content);

    Backbone.trigger('elScroll:new', rightbar);
//    elScroll(rightbar, {applyStyling: false});
//    Backbone.trigger('elScroll:new', rightbar, {applyStyling: false});
});