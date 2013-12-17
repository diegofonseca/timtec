(function(angular){
    'use strict';
    var app = angular.module('new-course');

    app.directive('file', function(){
        return {
            'restrict': 'E',
            'require': '?ngModel',
            'link': function(scope, element, attrs, ngModel) {
                var input = document.createElement('input');
                input.type = 'file';
                input.onchange = function(evt) {
                    if(evt.target.files) {
                        ngModel.$setViewValue(evt.target.files[0]);
                    }
                    scope.$apply();
                };

                for( var att in attrs ) {
                    if(! /^ng/.test(att)) {
                        input[att] = element.attr(att);
                    }
                }
                input.className = element.attr('class').replace(/\bng[^ ]+ */g, '').trim();
                element.attr('class', '');

                element.append(input);
            }
        };
    });

    app.directive('localImage', function(){
        return {
            'restrict': 'A',
            'link': function(scope, element, attrs) {
                var img = element[0];
                var reader = new FileReader();

                reader.onload = function(evt) {
                    img.src = evt.target.result;
                };

                if( attrs.ngModel ) {
                    scope.$watch(attrs.ngModel, function(d){
                        if( window.File && d && d.constructor === window.File ) {
                            img.style.display = '';
                            reader.readAsDataURL( d );
                        } else {
                            img.style.display = 'none';
                        }
                    });
                }
            }
        };
    });

    app.directive('alert', function(){
        return {
            'restrict': 'A',
            'link': function(scope) {

                scope.alert = {
                    hidden : true,
                    reset: function(){
                        this.title = '';
                        this.type = '';
                        this.messages = [];
                        this.showControls=false;
                    },
                    popup: function(title, messages, showControls){
                        this.reset();
                        this.title = title;
                        this.messages = messages;
                        this.showControls = showControls;
                        this.hidden = false;
                    },
                    success: function(){
                        this.popup.apply(this, arguments);
                        this.type = 'success';
                    },
                    error: function(){
                        this.popup.apply(this, arguments);
                        this.type = 'danger';
                    },
                    hide: function(callback, timeout) {
                        var that = this;
                        setTimeout(function(){
                            that.hidden = true;
                            callback.call();
                        }, timeout || 3000);
                    }
                };
                scope.alert.reset();
            }
        };
    });

})(window.angular);