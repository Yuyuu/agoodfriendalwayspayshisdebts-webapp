"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The activity directive", function () {
  var scope, $interpolate, directive;

  beforeEach(function () {
    scope = {operation: {}};
    $interpolate = function (markup) {return function () {return markup;};};
  });

  beforeEach(function () {
    var ActivityDirective = require("./operation_directive");
    directive = new ActivityDirective($interpolate);
    directive.link(scope);
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should bind an operation type to an entity", function () {
    scope.operation.type = "EVENT_CREATION";
    expect(scope.entity()).to.equal("app.activity.event.label");

    scope.operation.type = "NEW_EXPENSE";
    expect(scope.entity()).to.equal("app.activity.expense.label");

    scope.operation.type = "EXPENSE_DELETED";
    expect(scope.entity()).to.equal("app.activity.expense.label");

    scope.operation.type = "NEW_PARTICIPANT";
    expect(scope.entity()).to.equal("app.activity.participant.label");

    scope.operation.type = "PARTICIPANT_EDITED";
    expect(scope.entity()).to.equal("app.activity.participant.label");

    scope.operation.type = "NEW_REMINDER";
    expect(scope.entity()).to.equal("app.activity.reminder.label");
  });

  it("should bind an operation type to a complement", function () {
    scope.operation.type = "EVENT_CREATION";
    expect(scope.complement()).to.equal("app.activity.event.create");

    scope.operation.type = "NEW_EXPENSE";
    expect(scope.complement()).to.equal("app.activity.expense.new");

    scope.operation.type = "EXPENSE_DELETED";
    expect(scope.complement()).to.equal("app.activity.expense.delete");

    scope.operation.type = "NEW_PARTICIPANT";
    expect(scope.complement()).to.equal("app.activity.participant.new");

    scope.operation.type = "PARTICIPANT_EDITED";
    expect(scope.complement()).to.equal("app.activity.participant.edit");

    scope.operation.type = "NEW_REMINDER";
    expect(scope.complement()).to.equal("app.activity.reminder.dot");
  });
});