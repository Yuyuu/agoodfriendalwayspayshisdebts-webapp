"use strict";

var proxyquire = require("proxyquire");

var sinon = require("sinon");

var listenerDecorator = require("../../../../test/listener_decorator");
var watcherDecorator = require("../../../../test/watcher_decorator");

describe("The affix panel directive", function () {
  var angularModule, affix, scope, element, $affix, $window, $timeout, directive;

  beforeEach(function () {
    angularModule = {element: sinon.stub(), "@noCallThru": true};
    angularModule.element.withArgs($window).returns("window");
    angularModule.element.withArgs("#page-footer").returns({outerHeight: sinon.stub().returns(10)});
  });

  beforeEach(function () {
    affix = {destroy: sinon.spy()};
    scope = watcherDecorator.decorate(listenerDecorator.decorate({}));
    element = {data: sinon.stub().withArgs("offset-top").returns("7")};
    $affix = sinon.stub().returns(affix);
    $window = {};
    $timeout = function (callback) {callback();};
  });

  beforeEach(function () {
    var AffixElementDirective = proxyquire("./affix_panel_directive", {angular: angularModule});
    directive = new AffixElementDirective($affix, $window, $timeout);
    directive.link(scope, element);
  });

  it("should be defined", function () {
    directive.should.be.defined;
  });

  it("should affix the panel when the list panel becomes taller", function () {
    scope.change("listPanelIsTallerThanCreationPanel", true);

    $affix.should.have.been.called;
  });

  it("should retrieve the top offset from the element", function () {
    scope.change("listPanelIsTallerThanCreationPanel", true);

    $affix.args[0][1].offsetTop.should.equal("7");
  });

  it("should retrieve the bottom offset from footer height", function () {
    scope.change("listPanelIsTallerThanCreationPanel", true);

    $affix.args[0][1].offsetBottom.should.equal("10");
  });

  it("should target the window element", function () {
    scope.change("listPanelIsTallerThanCreationPanel", true);

    $affix.args[0][1].target.should.equal("window");
  });

  it("should remove the affix when the list panel is or becomes smaller", function () {
    scope.change("listPanelIsTallerThanCreationPanel", true);
    scope.change("listPanelIsTallerThanCreationPanel", false);

    affix.destroy.should.have.been.called;
  });

  it("should destroy the affix on scope destruction", function () {
    scope.change("listPanelIsTallerThanCreationPanel", true);
    scope.emit("$destroy");

    affix.destroy.should.have.been.called;
  });
});