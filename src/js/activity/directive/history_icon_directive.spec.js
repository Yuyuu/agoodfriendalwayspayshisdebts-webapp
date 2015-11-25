"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The history icon directive", function () {
  var scope, element, directive;

  beforeEach(function () {
    scope = {summary: {}};
    element = {addClass: sinon.spy()};
  });

  beforeEach(function () {
    var HistoryIconDirective = require("./history_icon_directive");
    directive = new HistoryIconDirective();
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should be restricted to element and class scope", function () {
    expect(directive.restrict).to.equal("AC");
  });

  it("should add the corresponding icon to the element", function () {
    scope.summary.type = "NEW_EXPENSE";
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("glyphicon-plus-sign");

    scope.summary.type = "EXPENSE_DELETED";
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("glyphicon-minus-sign");

    scope.summary.type = "NEW_PARTICIPANT";
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("glyphicon-plus-sign");

    scope.summary.type = "PARTICIPANT_EDITED";
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("glyphicon-pencil");

    scope.summary.type = "NEW_REMINDER";
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("glyphicon-envelope");
  });
});