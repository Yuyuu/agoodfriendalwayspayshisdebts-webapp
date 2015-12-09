"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The activity directive", function () {
  var scope, directive;

  beforeEach(function () {
    scope = {operation: {}};
  });

  beforeEach(function () {
    var ActivityDirective = require("./operation_directive");
    directive = new ActivityDirective();
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should bind an operation type to a label", function () {
    scope.operation.type = "EVENT_CREATION";
    directive.link(scope);
    expect(scope.label()).to.equal("app.activity.event.label");

    scope.operation.type = "NEW_EXPENSE";
    directive.link(scope);
    expect(scope.label()).to.equal("app.activity.expense.label");

    scope.operation.type = "EXPENSE_DELETED";
    directive.link(scope);
    expect(scope.label()).to.equal("app.activity.expense.label");

    scope.operation.type = "NEW_PARTICIPANT";
    directive.link(scope);
    expect(scope.label()).to.equal("app.activity.participant.label");

    scope.operation.type = "PARTICIPANT_EDITED";
    directive.link(scope);
    expect(scope.label()).to.equal("app.activity.participant.label");

    scope.operation.type = "REMINDER_DELIVERED";
    directive.link(scope);
    expect(scope.label()).to.equal("app.activity.reminder.label");

    scope.operation.type = "REMINDER_DROPPED";
    directive.link(scope);
    expect(scope.label()).to.equal("app.activity.reminder.label");
  });

  it("should bind an operation type to a complement", function () {
    scope.operation.type = "EVENT_CREATION";
    directive.link(scope);
    expect(scope.complement()).to.equal("app.activity.event.create");

    scope.operation.type = "NEW_EXPENSE";
    directive.link(scope);
    expect(scope.complement()).to.equal("app.activity.expense.new");

    scope.operation.type = "EXPENSE_DELETED";
    directive.link(scope);
    expect(scope.complement()).to.equal("app.activity.expense.delete");

    scope.operation.type = "NEW_PARTICIPANT";
    directive.link(scope);
    expect(scope.complement()).to.equal("app.activity.participant.new");

    scope.operation.type = "PARTICIPANT_EDITED";
    directive.link(scope);
    expect(scope.complement()).to.equal("app.activity.participant.edit");

    scope.operation.type = "REMINDER_DELIVERED";
    directive.link(scope);
    expect(scope.complement()).to.equal("app.activity.reminder.deliver");

    scope.operation.type = "REMINDER_DROPPED";
    directive.link(scope);
    expect(scope.complement()).to.equal("app.activity.reminder.drop");
  });
});