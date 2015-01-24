/*!
 simple-js-views
 Version 0.0.2
 Copyright © 2015 Juhana Räsänen
 Licensed under the MIT license.
*/


(function() {
    'use strict';

    var oldWindowLoad = window.onload;
    var initializers = {};

    function SimpleViews() {
        // Empty for now
    }

    
    /* Registers an init function */
    SimpleViews.registerInitializer = function(name, initfunc) {
        initializers[name] = {
            initfunc: initfunc
        };
    };

    
    /* When page loads, run the init functions found on page */
    window.onload = function() {
        if (oldWindowLoad) {
            oldWindowLoad();
        }

        var body = document.getElementsByTagName('body')[0];
        if (body) {
            var initname = body.getAttribute('data-sv-init');
            if (initname && initializers[initname] && initializers[initname].initfunc) {
                initializers[initname].initfunc.call(body);
            }
        }
    };

    window.SimpleViews = SimpleViews;

}());
