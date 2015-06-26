'use strict';

describe('Directive: affixall', function () {

  // load the directive's module
  beforeEach(module('affixalllApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<affixall></affixall>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the affixall directive');
  }));
});
