/*!
 simple-js-views
 Version 0.0.1
 Copyright © 2015 Juhana Räsänen
 Licensed under the MIT license.
*/


(function() {
    'use strict';

    var oldWindowLoad = window.onload;
    var pages = {};

    function SimpleViews() {
        // Empty for now
    }

    
    /* Registers a page and its init function */
    SimpleViews.page = function(name, initfunc) {
        pages[name] = {
            initfunc: initfunc
        };
    };

    
    /* When page loads, run its init function if found */
    window.onload = function() {
        if (oldWindowLoad) {
            oldWindowLoad();
        }

        var body = document.getElementsByTagName('body')[0];
        if (body) {
            var pagename = body.getAttribute('simple-page-name');
            if (pagename && pages[pagename] && pages[pagename].initfunc) {
                pages[pagename].initfunc();
            }
        }
    };

    window.SimpleViews = SimpleViews;

}());
