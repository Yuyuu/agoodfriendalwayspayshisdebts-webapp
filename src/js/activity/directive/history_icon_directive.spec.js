"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The history icon directive", function () {
  var scope, element, attributes, directive;

  beforeEach(function () {
    scope = {$eval: function (str) {return str;}, summary: {}};
    element = {addClass: sinon.spy()};
    attributes = {$set: sinon.spy()};
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
    directive.link(scope, element, attributes);
    expect(attributes.$set).to.have.been.calledWith("title", "'app.history.expenses.added' | i18next");
    expect(element.addClass).to.have.been.calledWith("fa-plus-circle");

    scope.summary.type = "EXPENSE_DELETED";
    directive.link(scope, element, attributes);
    expect(attributes.$set).to.have.been.calledWith("title", "'app.history.expenses.deleted' | i18next");
    expect(element.addClass).to.have.been.calledWith("fa-minus-circle");

    scope.summary.type = "NEW_PARTICIPANT";
    directive.link(scope, element, attributes);
    expect(attributes.$set).to.have.been.calledWith("title", "'app.history.participants.added' | i18next");
    expect(element.addClass).to.have.been.calledWith("fa-user-plus");

    scope.summary.type = "PARTICIPANT_EDITED";
    directive.link(scope, element, attributes);
    expect(attributes.$set).to.have.been.calledWith("title", "'app.history.participants.edited' | i18next");
    expect(element.addClass).to.have.been.calledWith("fa-pencil");

    scope.summary.type = "REMINDER_DELIVERED";
    directive.link(scope, element, attributes);
    expect(attributes.$set).to.have.been.calledWith("title", "'app.history.reminders.delivered' | i18next");
    expect(element.addClass).to.have.been.calledWith("fa-check-circle");

    scope.summary.type = "REMINDER_DROPPED";
    directive.link(scope, element, attributes);
    expect(attributes.$set).to.have.been.calledWith("title", "'app.history.reminders.dropped' | i18next");
    expect(element.addClass).to.have.been.calledWith("fa-exclamation-triangle");
  });
});