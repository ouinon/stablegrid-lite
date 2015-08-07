'use strict';

/**
 * @ngdoc directive
 * @name affixalllApp.directive:wrapInput
 * @description
 * # wrapInput
 */
angular.module('affixalllApp')
  .directive('oInput', function () {
    return {
      template:
		'<div class="o-input" ng-class="{\'focus\':focus}">'+
			'<input ng-model="inpModel" ng-focus="focus=1" ng-blur="focus=0" type="text" placeholder="{{placeHolder}}">'+
		'</div>',
      replace:true,
      restrict: 'E',
      scope:{
      	inpModel:'=ngModel',
      	placeHolder:'@placeholder'
      }
    };
  });
