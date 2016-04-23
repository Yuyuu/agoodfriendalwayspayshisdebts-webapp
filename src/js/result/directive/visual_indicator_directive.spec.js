"use strict";

var sinon = require("sinon");

describe("The visual indicator directive", function () {
  var scope, element, directive;

  beforeEach(function () {
    scope = {row: {mitigatedDebt: 0, advance: 0}};
    element = {addClass: sinon.spy()};
  });

  beforeEach(function () {
    var VisualIndicatorDirective = require("./visual_indicator_directive");
    directive = new VisualIndicatorDirective();
  });

  it("should be defined", function () {
    directive.should.be.defined;
  });

  it("should add the danger class to the row if the debt amount is superior to 0.005", function () {
    scope.row.mitigatedDebt = 5;
    directive.link(scope, element);
    element.addClass.should.have.been.calledWith("danger");
  });

  it("should add the danger class to the row if the debt amount is equal to 0.005", function () {
    scope.row.mitigatedDebt = 0.005;
    directive.link(scope, element);
    element.addClass.should.have.been.calledWith("danger");
  });

  it("should add the warning class to the row if the advance amount is superior to 0.005", function () {
    scope.row.advance = 5;
    directive.link(scope, element);
    element.addClass.should.have.been.calledWith("warning");
  });

  it("should add the danger class to the row if the debt amount is equal to 0.005", function () {
    scope.row.advance = 0.005;
    directive.link(scope, element);
    element.addClass.should.have.been.calledWith("warning");
  });

  it("should not add any class if there is no debt or advance", function () {
    directive.link(scope, element);
    element.addClass.should.not.have.been.called;
  });
});