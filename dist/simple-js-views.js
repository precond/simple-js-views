/*!
 simple-js-views
 Version 0.1.0
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

    
    /* Executes an initializer function if one is registered for the given element on page.
       Checks if the HTML element defining the initializer has argument attributes (beginning
       with "data-sv-arg-") and passes those to the init function if found.
     */
    function executeInitializer(element) {
        var initname = element.getAttribute('data-sv-init');
        if (initname && initializers[initname] && initializers[initname].initfunc) {
            var args = {};
            for (var i=0; i<element.attributes.length; i++) {
                var a = element.attributes[i];
                if (a.name.toLowerCase().indexOf('data-sv-arg-') == 0) {
                    var name = a.name.toLowerCase().substr(12);
                    args[name] = a.value;
                }
            }
            initializers[initname].initfunc.call(element, args);
        }
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

        // Always execute the <body> initializer first, if found
        var body = document.getElementsByTagName('body')[0];
        if (body) {
            executeInitializer(body);
        }
        
        // Then check all elements that have the magic class
        var elements = document.getElementsByClassName('sv-init');
        for (var i=0; i<elements.length; i++) {
            // Make sure not to execute body initializer twice, if it happens to have the magic class
            if (elements[i].nodeName != 'BODY') {
                executeInitializer(elements[i]);
            }
        }
    };

    window.SimpleViews = SimpleViews;

}());
