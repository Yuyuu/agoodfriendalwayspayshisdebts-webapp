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

  it("should bind an operation type to message markup", function () {
    scope.operation.type = "EVENT_CREATION";
    expect(scope.message()).to.equal("{{'app.activity.create' | i18next}}");

    scope.operation.type = "NEW_EXPENSE";
    expect(scope.message()).to.equal("{{'app.activity.expense.label' | i18next}} {{operation.data}} {{'app.activity.expense.new' | i18next}}");

    scope.operation.type = "EXPENSE_DELETED";
    expect(scope.message()).to.equal("{{'app.activity.expense.label' | i18next}} {{operation.data}} {{'app.activity.expense.delete' | i18next}}");

    scope.operation.type = "NEW_PARTICIPANT";
    expect(scope.message()).to.equal("{{'app.activity.participant.label' | i18next}} {{operation.data}} {{'app.activity.participant.new' | i18next}}");

    scope.operation.type = "PARTICIPANT_EDITED";
    expect(scope.message()).to.equal("{{'app.activity.participant.label' | i18next}} {{operation.data}} {{'app.activity.participant.edit' | i18next}}");

    scope.operation.type = "NEW_REMINDER";
    expect(scope.message()).to.equal("{{'app.activity.reminder' | i18next}} {{operation.data}}");
  });
});