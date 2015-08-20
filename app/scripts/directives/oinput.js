'use strict';

/**
 * @ngdoc directive
 * @name affixalllApp.directive:wrapInput
 * @description
 * # wrapInput
 */
angular.module('affixalllApp')
  .directive('oInput', ['$timeout',function ($timeout) {
    return {
      // compile:function(elem,attr){
      //   console.log("o-input attr",elem,attr);
      //   // elem.removeAttr('o-input');
      // },
      scope:{
        ngModel:'='
      },
      require: 'ngModel',
      controller: ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {

        var that = this;
        this.$options = {};
        this.$options.allowInvalid = true;

      }],
      compile: function(tElem, tAttrs){
        return {
          pre: function(scope, elem){
            // elem.attr('ng-model-options',"{allowInvalid:true}");
            elem.wrap("<div class='o-input'></div>");

          },
          post: function(scope, $elem, attrs, ctrl){

            var oElem = $elem.parent();

            var compare = {};

            var checkValid = function() {
              console.log('validator',ctrl);
              if(ctrl.$valid){
                compare.valid = ctrl.$valid;
              };
            };

            $elem.bind('keypress', function(a,b,c) {
              console.log($elem.attr('class'));
            });

            $elem.bind('focus', function(event) {
              oElem.addClass('focus');
            }).bind('blur', function(event) {
              oElem.removeClass('focus');
            });

            ctrl.$viewChangeListeners.push(checkValid);

            $timeout(function(){checkValid();});
            
          }
        }
      },
      restrict:'A'
    };
  }]);
