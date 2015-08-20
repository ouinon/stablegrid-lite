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
      require: 'ngModel',
      compile: function(tElem, tAttrs){
        return {
          pre: function(scope, elem){
            // elem.attr('ng-model-options',"{allowInvalid:true}");
            elem.wrap("<div class='o-input'></div>");

          },
          post: function(scope, $elem, attrs, ctrl){

            var oElem = $elem.parent();
            var behaviour = ['removeClass','addClass'];
            var compare = {};

            var checkValid = function() {

              $timeout(function(){
                if(ctrl.$valid !== compare.valid){
                  console.log('fired');
                  oElem[behaviour[Number(ctrl.$valid)]]('valid');
                  compare.valid = ctrl.$valid;
                };
              })

            };

            $elem.bind('focus', function(event) {
              oElem.addClass('focus');
            }).bind('blur', function(event) {
              oElem.removeClass('focus');
            });

            ctrl.$viewChangeListeners.push(checkValid);

            checkValid();
            
          }
        }
      },
      restrict:'A'
    };
  }]);
