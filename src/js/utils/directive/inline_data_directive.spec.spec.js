"use strict";

var sinon = require("sinon");

var watcherDecorator = require("../../../../test/watcher_decorator");

describe("The inline data directive", function () {
  var $parse, scope, element, attributes, directive;

  beforeEach(function () {
    $parse = sinon.stub();
  });

  beforeEach(function () {
    scope = watcherDecorator.decorate({object: {data: ["hello", "hi"], property: [{text: "hello"}, {text: "world"}]}});
    element = {text: sinon.spy()};
    attributes = {debtsInlineData: "object.data"};
  });

  beforeEach(function () {
    var InlineElementDirective = require("./inline_data_directive");
    directive = new InlineElementDirective($parse);
  });

  it("should be defined", function () {
    directive.should.be.defined;
  });

  it("should transform an array into an inline string", function () {
    $parse.returns(function () {return scope.object.data;});

    directive.link(scope, element, attributes);
    scope.change("object.data", scope.object.data);

    element.text.should.have.been.calledWith("hello, hi");
  });

  it("should transform an array of object into an inline string given the property to select", function () {
    $parse.returns(function () {return scope.object.property;});
    attributes.debtsInlineData = "object.property;text";

    directive.link(scope, element, attributes);
    scope.change("object.property", scope.object.property);

    element.text.should.have.been.calledWith("hello, world");
  });
});