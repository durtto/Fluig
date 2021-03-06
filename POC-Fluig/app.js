//logica de navegação da tela inicial
'use strict';

(function() {
    var app = {
        data: {}
    };
    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                initial: 'components/home/view.html'
            });
        });
    };
    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            if (navigator && navigator.splashscreen) {
                setTimeout(function(){ 
                    navigator.splashscreen.hide();
                }, 4000);
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }
    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };
    window.app = app;
    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());