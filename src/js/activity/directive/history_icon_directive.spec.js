"use strict";

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
    directive.should.be.defined;
  });

  it("should be restricted to element and class scope", function () {
    directive.restrict.should.equal("AC");
  });

  it("should add the corresponding icon to the element", function () {
    scope.summary.operationType = "NEW_EXPENSE";
    directive.link(scope, element, attributes);
    attributes.$set.should.have.been.calledWith("title", "'app.history.expenses.added' | i18next");
    element.addClass.should.have.been.calledWith("fa-plus-circle");

    scope.summary.operationType = "EXPENSE_DELETED";
    directive.link(scope, element, attributes);
    attributes.$set.should.have.been.calledWith("title", "'app.history.expenses.deleted' | i18next");
    element.addClass.should.have.been.calledWith("fa-minus-circle");

    scope.summary.operationType = "NEW_PARTICIPANT";
    directive.link(scope, element, attributes);
    attributes.$set.should.have.been.calledWith("title", "'app.history.participants.added' | i18next");
    element.addClass.should.have.been.calledWith("fa-user-plus");

    scope.summary.operationType = "PARTICIPANT_EDITED";
    directive.link(scope, element, attributes);
    attributes.$set.should.have.been.calledWith("title", "'app.history.participants.edited' | i18next");
    element.addClass.should.have.been.calledWith("fa-pencil");

    scope.summary.operationType = "REMINDER_DELIVERED";
    directive.link(scope, element, attributes);
    attributes.$set.should.have.been.calledWith("title", "'app.history.reminders.delivered' | i18next");
    element.addClass.should.have.been.calledWith("fa-check-circle");

    scope.summary.operationType = "REMINDER_DROPPED";
    directive.link(scope, element, attributes);
    attributes.$set.should.have.been.calledWith("title", "'app.history.reminders.dropped' | i18next");
    element.addClass.should.have.been.calledWith("fa-exclamation-triangle");
  });
});