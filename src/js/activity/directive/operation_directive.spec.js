"use strict";

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
    directive.should.be.defined;
  });

  it("should bind an operation type to a label", function () {
    scope.operation.operationType = "EVENT_CREATION";
    directive.link(scope);
    scope.label().should.equal("app.activity.event.label");

    scope.operation.operationType = "NEW_EXPENSE";
    directive.link(scope);
    scope.label().should.equal("app.activity.expense.label");

    scope.operation.operationType = "EXPENSE_DELETED";
    directive.link(scope);
    scope.label().should.equal("app.activity.expense.label");

    scope.operation.operationType = "NEW_PARTICIPANT";
    directive.link(scope);
    scope.label().should.equal("app.activity.participant.label");

    scope.operation.operationType = "PARTICIPANT_EDITED";
    directive.link(scope);
    scope.label().should.equal("app.activity.participant.label");

    scope.operation.operationType = "REMINDER_DELIVERED";
    directive.link(scope);
    scope.label().should.equal("app.activity.reminder.label");

    scope.operation.operationType = "REMINDER_DROPPED";
    directive.link(scope);
    scope.label().should.equal("app.activity.reminder.label");
  });

  it("should bind an operation type to a complement", function () {
    scope.operation.operationType = "EVENT_CREATION";
    directive.link(scope);
    scope.complement().should.equal("app.activity.event.create");

    scope.operation.operationType = "NEW_EXPENSE";
    directive.link(scope);
    scope.complement().should.equal("app.activity.expense.new");

    scope.operation.operationType = "EXPENSE_DELETED";
    directive.link(scope);
    scope.complement().should.equal("app.activity.expense.delete");

    scope.operation.operationType = "NEW_PARTICIPANT";
    directive.link(scope);
    scope.complement().should.equal("app.activity.participant.new");

    scope.operation.operationType = "PARTICIPANT_EDITED";
    directive.link(scope);
    scope.complement().should.equal("app.activity.participant.edit");

    scope.operation.operationType = "REMINDER_DELIVERED";
    directive.link(scope);
    scope.complement().should.equal("app.activity.reminder.deliver");

    scope.operation.operationType = "REMINDER_DROPPED";
    directive.link(scope);
    scope.complement().should.equal("app.activity.reminder.drop");
  });
});