/*global jQuery*/
(function ($, window) {

    "use strict";

    // custom namespace
    var started = started || {};

    // global variables
    var windowSmall   =  $(window).width() < 768,
    	windowMed	  =  $(window).width() >= 768 && $(window).width() < 1024,
    	windowLarge	  =  $(window).width() >= 1024;

    started.global = { 
        init: function() {

        }
    }

    //initialize
    started.global.init();

    $(window).on('resize',  function(event) {
        event.preventDefault();
        windowSmall   =  $(window).width() < 768;
        windowMed     =  $(window).width() >= 768 && $(window).width() < 1024;
        windowLarge   =  $(window).width() >= 1024;
    });

}(jQuery, this));
//end scope.


