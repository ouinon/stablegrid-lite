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
      restrict:'A',
      require: 'ngModel',
      scope:{
        ngModel:'='
      },
      compile: function(tElem, tAttrs){
        return {
          pre: function(scope,elem,attr){

            var otherClasses = ['Icn'];

            var elemParent = elem.wrap("<div class='o-input'></div>")
              .parent()
                .addClass('Pristine');
            
            if(attr.icons !== "false"){
              
              if(attr.disabled){
                otherClasses.push('Disabled');
              }

              elemParent.addClass(otherClasses.join(' '))
                .append("<div class='icn Blank'><i class='fa'></i></div>");

            };

          },
          post: function(scope, $elem, attrs, ctrl){

            var oElem = $elem.parent();
            var method = ['removeClass','addClass'];
            var compare = {};

            var checkValid = function(init) {
              // $timeout is a necessary hack to ensure that the element is updated after the listener has fired.
              if(!init){
                oElem[method[0]]('Pristine');
              }

              $timeout(function(){
                if(ctrl.$valid !== compare.valid){
                  // Toggle the classes
                  oElem[method[Number(ctrl.$valid)]]('Valid')
                    [method[Number(!ctrl.$valid)]]('Invalid');
                  compare.valid = ctrl.$valid;
                };
              })

            };

            $elem.bind('focus', function(event) {
              oElem.addClass('Focus');
            }).bind('blur', function(event) {
              oElem.removeClass('Focus');
            });

            ctrl.$viewChangeListeners.push(checkValid);

            checkValid(true);
            
          }
        }
      }      
    };
  }]);
