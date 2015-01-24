/**
 * Created by juhana on 1/24/15.
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
